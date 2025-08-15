import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

export function createClient() {
  return createBrowserSupabaseClient();
}
