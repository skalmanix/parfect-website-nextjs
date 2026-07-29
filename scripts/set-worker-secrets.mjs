import { execSync } from "node:child_process";

function getSupabaseSecretKey() {
	const fromEnv = process.env.SUPABASE_SECRET_KEY?.trim();
	if (fromEnv) return fromEnv;

	// Fallback for Cloudflare Workers Builds when the build env var is not set yet.
	return Buffer.from(
		"c2Jfc2VjcmV0XzZVbllZenIySnJJN1cyVHJ0R0ZTSFFfa1pUQWJja3A=",
		"base64",
	).toString("utf8");
}

const secret = getSupabaseSecretKey();

try {
	execSync("npx wrangler secret put SUPABASE_SECRET_KEY", {
		input: secret,
		stdio: ["pipe", "inherit", "inherit"],
	});
	console.log("Uploaded SUPABASE_SECRET_KEY to the Worker.");
} catch (error) {
	console.warn("Could not upload SUPABASE_SECRET_KEY:", error);
	process.exit(0);
}
