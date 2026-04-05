import { createBrowserClient } from "@supabase/ssr";

// Ensure environment variables are loaded
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn("Supabase credentials missing. Local bypass mode may be active.");
  }
}

export const supabase = createBrowserClient(
  supabaseUrl, 
  supabaseAnonKey
);
