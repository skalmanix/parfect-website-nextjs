import { createClient } from "@supabase/supabase-js";

const PROJECT_REF = "qzkiwomktytohggmwwjf";
const BUCKET = "waitlist";
const OBJECT_PATH = "signups.json";

const url =
	process.env.SUPABASE_URL?.trim() || `https://${PROJECT_REF}.supabase.co`;
const key =
	process.env.SUPABASE_SECRET_KEY?.trim() ||
	process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!key) {
	console.error("Set SUPABASE_SECRET_KEY before locking waitlist storage.");
	process.exit(1);
}

const supabase = createClient(url, key, {
	auth: { autoRefreshToken: false, persistSession: false },
});

const { error: updateError } = await supabase.storage.updateBucket(BUCKET, {
	public: false,
});

if (updateError && !updateError.message.toLowerCase().includes("not found")) {
	console.error("Failed to make waitlist bucket private:", updateError.message);
	process.exit(1);
}

const { error: removeError } = await supabase.storage
	.from(BUCKET)
	.remove([OBJECT_PATH]);

if (removeError && !removeError.message.toLowerCase().includes("not found")) {
	console.error("Failed to delete signups.json:", removeError.message);
	process.exit(1);
}

console.log("Waitlist storage bucket is private and signups.json was removed.");
