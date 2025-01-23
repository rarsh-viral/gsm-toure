import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;



if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

try {
  new URL(supabaseUrl); // This will throw an error if the URL is invalid
} catch (error) {
  console.error('Invalid Supabase URL:', supabaseUrl);
  throw new Error('Invalid Supabase URL. Please check your VITE_SUPABASE_URL environment variable.');
}



export const supabase = createClient(supabaseUrl, supabaseAnonKey)

