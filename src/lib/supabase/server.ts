import { createServerClient } from '@supabase/supabase-js';
import type { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    'Missing environment variable: NEXT_PUBLIC_SUPABASE_URL must be defined'
  );
}

export async function createServerSupabase(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  const client = createServerClient(supabaseUrl, supabaseServiceKey ?? '', {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component context - cookies will be handled by middleware
        }
      },
    },
  });

  return client;
}
