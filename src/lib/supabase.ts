import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True when the project URL and at least one key are configured. */
export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && (supabaseAnonKey || supabaseServiceRoleKey));
}

/**
 * Browser (client-side) Supabase client using the anon key.
 * Returns null when Supabase is not configured so importing this from
 * client components never crashes the build or the page.
 */
export function createBrowserClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createSupabaseJsClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
}

/**
 * Server-side Supabase client (anon key) for the Next.js App Router.
 * Reads cookies from `next/headers` so auth state is shared with the browser.
 * Missing env vars do NOT throw — the client is only created when called.
 */
export async function createClient() {
  const { createServerClient } = await import('@supabase/ssr');
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl ?? '', supabaseAnonKey ?? '', {
    cookies: {
      getAll: async () => {
        const all = await cookieStore.getAll();
        return all.map(({ name, value }) => ({ name, value }));
      },
    },
  });
}

/**
 * Server-side admin client (service role, bypasses RLS).
 * API routes / server scripts only. Never expose to the browser.
 * Returns null when the service role key is missing.
 */
export function createAdminClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) return null;
  return createSupabaseJsClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
