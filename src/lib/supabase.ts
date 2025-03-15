import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Create a Supabase client if the URL and key are provided
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  // Verificar se o usuário prefere outro tipo de armazenamento
  const storageType = localStorage.getItem("wems_storage_type");
  if (storageType && storageType !== "server") {
    return false;
  }

  if (!supabase) {
    console.warn(
      "Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.",
    );
    return false;
  }
  return true;
};

// Force storage type to JSON
export const forceJsonStorage = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("wems_storage_type", "jsonFile");
  }
};

// Only call this function in browser environment
if (typeof window !== "undefined") {
  forceJsonStorage();
}
