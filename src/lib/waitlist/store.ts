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

function getWaitlistFilePath() {
	return process.env.WAITLIST_FILE ?? ".data/waitlist.json";
}

async function readEntriesFromFile(): Promise<WaitlistEntry[]> {
	const { readFile } = await import("node:fs/promises");
	const path = await import("node:path");

	try {
		const raw = await readFile(path.join(process.cwd(), getWaitlistFilePath()), "utf8");
		return JSON.parse(raw) as WaitlistEntry[];
	} catch {
		return [];
	}
}

async function appendToFile(entry: WaitlistEntry): Promise<SaveWaitlistResult> {
	const { mkdir, writeFile } = await import("node:fs/promises");
	const path = await import("node:path");

	const filePath = path.join(process.cwd(), getWaitlistFilePath());
	const normalized = normalizeEmail(entry.email);
	const entries = await readEntriesFromFile();

	if (entries.some((item) => normalizeEmail(item.email) === normalized)) {
		return "duplicate";
	}

	entries.push({ ...entry, email: normalized });
	await mkdir(path.dirname(filePath), { recursive: true });
	await writeFile(filePath, JSON.stringify(entries, null, 2));
	return "saved";
}

async function saveToSupabase(
	entry: WaitlistEntry,
): Promise<SaveWaitlistResult | null> {
	const supabase = getSupabaseAdmin();
	if (!supabase) return null;

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
	const supabaseResult = await saveToSupabase(entry);
	if (supabaseResult) return supabaseResult;

	try {
		return await appendToFile(entry);
	} catch {
		return "unavailable";
	}
}
