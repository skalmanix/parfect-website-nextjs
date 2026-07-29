import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";

const PROJECT_REF = "qzkiwomktytohggmwwjf";
const DEFAULT_SUPABASE_URL = `https://${PROJECT_REF}.supabase.co`;
const WAITLIST_BUCKET = "waitlist";
const WAITLIST_STORAGE_PATH = "signups.json";
const MIGRATION_PATH = "supabase/migrations/20260729120000_waitlist_signups.sql";

function getSupabaseSecretKey() {
	return (
		process.env.SUPABASE_SECRET_KEY?.trim() ||
		process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
		null
	);
}

function getDatabaseUrl() {
	const direct = process.env.DATABASE_URL?.trim() || process.env.SUPABASE_DB_URL?.trim();
	if (direct) return direct;

	const password = process.env.SUPABASE_DB_PASSWORD?.trim();
	if (!password) return null;

	const region = process.env.SUPABASE_REGION?.trim() || "eu-west-1";
	const encodedPassword = encodeURIComponent(password);
	return `postgresql://postgres.${PROJECT_REF}:${encodedPassword}@aws-0-${region}.pooler.supabase.com:5432/postgres`;
}

function runMigration(databaseUrl) {
	const sql = readFileSync(MIGRATION_PATH, "utf8");
	const result = spawnSync("psql", [databaseUrl, "-v", "ON_ERROR_STOP=1", "-c", sql], {
		stdio: "inherit",
		encoding: "utf8",
	});

	if (result.status !== 0) {
		throw new Error("Migration failed");
	}
}

async function migrateStorageSignups(supabase) {
	const { data: file, error: downloadError } = await supabase.storage
		.from(WAITLIST_BUCKET)
		.download(WAITLIST_STORAGE_PATH);

	if (downloadError || !file) {
		console.log("No storage signups file to migrate.");
		return 0;
	}

	let entries;
	try {
		entries = JSON.parse(await file.text());
	} catch {
		console.log("Storage signups file is not valid JSON.");
		return 0;
	}

	if (!Array.isArray(entries) || entries.length === 0) {
		console.log("No storage signups to migrate.");
		return 0;
	}

	let migrated = 0;
	for (const entry of entries) {
		const email = entry.email?.trim().toLowerCase();
		if (!email) continue;

		const { error } = await supabase.from("waitlist_signups").insert({
			email,
			locale: entry.locale?.trim() || "en",
			created_at: entry.createdAt || entry.created_at || new Date().toISOString(),
		});

		if (!error) {
			migrated += 1;
			continue;
		}

		if (error.code === "23505") continue;

		throw new Error(`Failed to migrate ${email}: ${error.message}`);
	}

	console.log(`Migrated ${migrated} signup(s) from storage to Postgres.`);
	return migrated;
}

async function verifyTable(supabase) {
	const testEmail = `setup-verify-${Date.now()}@example.com`;
	const { error: insertError } = await supabase.from("waitlist_signups").insert({
		email: testEmail,
		locale: "en",
	});

	if (insertError) {
		throw new Error(`Table verification failed: ${insertError.message}`);
	}

	const { error: deleteError } = await supabase
		.from("waitlist_signups")
		.delete()
		.eq("email", testEmail);

	if (deleteError) {
		throw new Error(`Cleanup after verification failed: ${deleteError.message}`);
	}
}

async function main() {
	const databaseUrl = getDatabaseUrl();
	if (!databaseUrl) {
		console.error(
			"Set DATABASE_URL or SUPABASE_DB_PASSWORD (from Supabase Dashboard → Project Settings → Database).",
		);
		process.exit(1);
	}

	const secretKey = getSupabaseSecretKey();
	if (!secretKey) {
		console.error("Set SUPABASE_SECRET_KEY before running setup.");
		process.exit(1);
	}

	console.log("Applying waitlist migration...");
	runMigration(databaseUrl);

	const supabase = createClient(
		process.env.SUPABASE_URL?.trim() || DEFAULT_SUPABASE_URL,
		secretKey,
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		},
	);

	console.log("Verifying Postgres table...");
	await verifyTable(supabase);

	console.log("Migrating existing storage signups...");
	await migrateStorageSignups(supabase);

	console.log("Waitlist Postgres table is ready.");
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
