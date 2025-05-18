import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || (() => { throw new Error('VITE_SUPABASE_URL is not defined') })();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || (() => { throw new Error('VITE_SUPABASE_ANON_KEY is not defined') })();

export const supabase = createClient(supabaseUrl, supabaseAnonKey)