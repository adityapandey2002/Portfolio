import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { isHttpUrl, isSet } from '@/lib/env';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let adminClient: SupabaseClient | null = null;

export function isSupabaseConfigured() {
  return isHttpUrl(url) && (isSet(serviceKey) || isSet(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY));
}

/**
 * Server-only Supabase client (service role — bypasses RLS).
 * Use ONLY inside API routes / server components / scripts.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!isHttpUrl(url) || !isSet(serviceKey)) {
    throw new Error('Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  }
  if (!adminClient) {
    adminClient = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return adminClient;
}

export function supabaseUrl() {
  return url ?? '';
}

export function supabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
}
