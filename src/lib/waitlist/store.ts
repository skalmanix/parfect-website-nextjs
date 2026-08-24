import { join } from "node:path";
import {
	getSupabaseAdmin,
	type WaitlistSignupRow,
} from "@/lib/waitlist/supabase";

export type WaitlistEntry = {
	email: string;
	locale: string;
	createdAt: string;
};

export type SaveWaitlistResult = "saved" | "duplicate" | "unavailable";

function normalizeEmail(email: string) {
	return email.trim().toLowerCase();
}

const WAITLIST_DATA_DIR = ".data";
const WAITLIST_DATA_FILE = "waitlist.json";

function getLocalWaitlistFilePath(cwd: string) {
	if (process.env.WAITLIST_FILE) {
		return join(/* turbopackIgnore: true */ cwd, process.env.WAITLIST_FILE);
	}

	return join(cwd, WAITLIST_DATA_DIR, WAITLIST_DATA_FILE);
}

async function readEntriesFromFile(): Promise<WaitlistEntry[]> {
	const { readFile } = await import("node:fs/promises");

	try {
		const raw = await readFile(getLocalWaitlistFilePath(process.cwd()), "utf8");
		return JSON.parse(raw) as WaitlistEntry[];
	} catch {
		return [];
	}
}

async function appendToFile(entry: WaitlistEntry): Promise<SaveWaitlistResult> {
	const { mkdir, writeFile } = await import("node:fs/promises");
	const { dirname } = await import("node:path");

	const filePath = getLocalWaitlistFilePath(process.cwd());
	const normalized = normalizeEmail(entry.email);
	const entries = await readEntriesFromFile();

	if (entries.some((item) => normalizeEmail(item.email) === normalized)) {
		return "duplicate";
	}

	entries.push({ ...entry, email: normalized });
	await mkdir(dirname(filePath), { recursive: true });
	await writeFile(filePath, JSON.stringify(entries, null, 2));
	return "saved";
}

async function saveToSupabaseTable(
	supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>,
	entry: WaitlistEntry,
): Promise<SaveWaitlistResult> {
	const row = {
		email: normalizeEmail(entry.email),
		locale: entry.locale,
		created_at: entry.createdAt,
	} satisfies Omit<WaitlistSignupRow, "id">;

	const { error } = await supabase.from("waitlist_signups").insert(row);

	if (!error) return "saved";
	if (error.code === "23505") return "duplicate";

	console.error("waitlist supabase insert failed:", error.message);
	return "unavailable";
}

export async function saveWaitlistEntry(
	entry: WaitlistEntry,
): Promise<SaveWaitlistResult> {
	const supabase = getSupabaseAdmin();
	if (supabase) return saveToSupabaseTable(supabase, entry);

	try {
		return await appendToFile(entry);
	} catch {
		return "unavailable";
	}
}
