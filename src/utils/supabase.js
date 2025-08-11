import { createClient } from '@supabase/supabase-js';

// eslint-disable-next-line no-undef
const supabaseUrl = process.env.VITE_SUPABASE_URL;
// eslint-disable-next-line no-undef
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
