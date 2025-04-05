import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY);

export const supabaseAdmin = createClient(
	import.meta.env.VITE_SUPABASE_PROJECT_URL,
	import.meta.env.VITE_SUPABASE_SERVICE_ROL_KEY
);
