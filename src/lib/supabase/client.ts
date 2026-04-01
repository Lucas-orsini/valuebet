import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser-side Supabase client for Client Components.
 * This client uses the public anon key and is safe for client-side usage.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
