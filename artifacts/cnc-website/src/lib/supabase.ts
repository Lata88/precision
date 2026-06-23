import { createClient } from "@supabase/supabase-js";

function requireEnv(
  name: "VITE_SUPABASE_URL" | "VITE_SUPABASE_ANON_KEY",
  value: string | undefined,
) {
  if (!value) {
    throw new Error(`${name} must be set before using the Supabase client.`);
  }

  return value;
}

const supabaseUrl = requireEnv(
  "VITE_SUPABASE_URL",
  import.meta.env.VITE_SUPABASE_URL,
);
const supabaseAnonKey = requireEnv(
  "VITE_SUPABASE_ANON_KEY",
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
