import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { REDIRECT_AFTER_AUTH } from '@/lib/constants';

interface CallbackRequestBody {
  code?: string;
}

const VALID_CODE_LENGTH = 40; // Supabase OAuth codes are typically 40+ characters

/**
 * POST /api/auth/callback
 *
 * OAuth callback handler for Supabase authentication.
 * Exchanges the authorization code for a session and redirects to dashboard.
 *
 * @body { code: string } - The OAuth authorization code from Supabase
 * @returns 302 - Redirect to dashboard on success
 * @returns 400 - Invalid or missing code
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CallbackRequestBody = await request.json();

    // Validate code presence
    if (!body.code || typeof body.code !== 'string') {
      return NextResponse.json(
        { error: 'invalid_code', message: 'Code d\'autorisation manquant.' },
        { status: 400 }
      );
    }

    // Validate code format (basic sanity check)
    const code = body.code.trim();
    if (code.length < VALID_CODE_LENGTH) {
      return NextResponse.json(
        { error: 'invalid_code', message: 'Code d\'autorisation invalide.' },
        { status: 400 }
      );
    }

    // Exchange code for session using Supabase server client
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.session) {
      console.error('[Auth Callback] Session exchange failed:', error?.message);
      return NextResponse.json(
        { error: 'invalid_code', message: 'Code d\'autorisation invalide ou expiré.' },
        { status: 400 }
      );
    }

    // Success: redirect to dashboard
    // The session cookie is automatically set by the Supabase server client
    return NextResponse.redirect(
      new URL(REDIRECT_AFTER_AUTH, request.url),
      { status: 302 }
    );

  } catch (err) {
    // Handle JSON parsing errors or other unexpected errors
    console.error('[Auth Callback] Unexpected error:', err);
    return NextResponse.json(
      { error: 'invalid_code', message: 'Erreur lors du traitement de la requête.' },
      { status: 400 }
    );
  }
}

// OPTIONS for CORS preflight (if needed for cross-origin OAuth)
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
