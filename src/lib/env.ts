/**
 * Env-var guards shared by the Supabase helpers.
 *
 * `.env` files often keep the example values (`your-supabase-project-url…`)
 * around while a service is still being set up. Treating those as real
 * configuration used to make `createClient` throw at request time, which
 * surfaced as an opaque 500 on the contact endpoint. These helpers let the
 * callers report "not configured" instead.
 */

/** True when the variable holds a real value, not empty and not an example. */
export function isSet(value?: string): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return !/^your[-_]/i.test(trimmed);
}

/** True when the variable holds an absolute http(s) URL. */
export function isHttpUrl(value?: string): value is string {
  return isSet(value) && /^https?:\/\/\S+$/i.test(value.trim());
}
