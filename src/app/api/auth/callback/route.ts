import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * OAuth Callback Handler
 * Gère le retour depuis le provider OAuth (Google)
 * Redirige vers /dashboard en cas de succès
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  // Handle OAuth errors
  if (error) {
    console.error('OAuth Error:', error, errorDescription);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(errorDescription || error)}`, requestUrl.origin)
    );
  }

  // Handle missing code
  if (!code) {
    return NextResponse.redirect(
      new URL('/login?error=code_manquant', requestUrl.origin)
    );
  }

  try {
    const supabase = await createClient();

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error('Session Exchange Error:', exchangeError);
      return NextResponse.redirect(
        new URL(`/login?error=session_invalide`, requestUrl.origin)
      );
    }

    // Success - redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
  } catch (e) {
    console.error('Callback Error:', e);
    return NextResponse.redirect(
      new URL('/login?error=erreur_inattendue', requestUrl.origin)
    );
  }
}

/**
 * POST handler for email confirmation links
 */
export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const tokenHash = formData.get('token_hash') as string;
  const type = formData.get('type') as string;
  const next = formData.get('next') as string;

  if (tokenHash && type === 'email_confirmation') {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type: 'email_confirmation',
      token_hash: tokenHash,
    });

    if (!error) {
      return NextResponse.redirect(
        new URL(next || '/dashboard', requestUrl.origin)
      );
    }
  }

  return NextResponse.redirect(
    new URL('/login?error=confirmation_echouee', requestUrl.origin)
  );
}
