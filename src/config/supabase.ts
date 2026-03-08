import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL?.trim() || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";

const isValidSupabaseUrl = (value: string): boolean => {
	if (!value) {
		return false;
	}

	try {
		const url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
	};

const hasSupabaseConfig = Boolean(isValidSupabaseUrl(supabaseUrl) && supabaseServiceKey);

export const supabase = hasSupabaseConfig
	? createClient(supabaseUrl, supabaseServiceKey)
	: null;

export const isSupabaseConfigured = (): boolean => hasSupabaseConfig;
