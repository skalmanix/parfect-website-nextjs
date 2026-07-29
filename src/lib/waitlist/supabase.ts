import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const SUPABASE_PROJECT_ID = "qzkiwomktytohggmwwjf";

export const DEFAULT_SUPABASE_URL =
	`https://${SUPABASE_PROJECT_ID}.supabase.co`;

export type WaitlistSignupRow = {
	id: string;
	email: string;
	locale: string;
	created_at: string;
};

export function getSupabaseAdmin(): SupabaseClient | null {
	const url = process.env.SUPABASE_URL?.trim() || DEFAULT_SUPABASE_URL;
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
	if (!key) return null;

	return createClient(url, key, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});
}
