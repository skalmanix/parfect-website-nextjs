import {
	getSupabaseAdmin,
	WAITLIST_BUCKET,
	WAITLIST_STORAGE_PATH,
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

function isMissingTableError(message: string) {
	return (
		message.includes("waitlist_signups") ||
		message.includes("PGRST205") ||
		message.includes("schema cache")
	);
}

async function readEntriesFromStorage(
	supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>,
): Promise<WaitlistEntry[]> {
	const { data, error } = await supabase.storage
		.from(WAITLIST_BUCKET)
		.download(WAITLIST_STORAGE_PATH);

	if (error || !data) return [];

	try {
		return JSON.parse(await data.text()) as WaitlistEntry[];
	} catch {
		return [];
	}
}

async function saveToSupabaseStorage(
	supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>,
	entry: WaitlistEntry,
): Promise<SaveWaitlistResult> {
	const normalized = normalizeEmail(entry.email);
	const entries = await readEntriesFromStorage(supabase);

	if (entries.some((item) => normalizeEmail(item.email) === normalized)) {
		return "duplicate";
	}

	entries.push({ ...entry, email: normalized });

	const { error } = await supabase.storage
		.from(WAITLIST_BUCKET)
		.upload(WAITLIST_STORAGE_PATH, JSON.stringify(entries, null, 2), {
			upsert: true,
			contentType: "application/json",
		});

	if (error) {
		console.error("waitlist storage upload failed:", error.message);
		return "unavailable";
	}

	return "saved";
}

async function saveToSupabaseTable(
	supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>,
	entry: WaitlistEntry,
): Promise<SaveWaitlistResult | "missing_table"> {
	const row = {
		email: normalizeEmail(entry.email),
		locale: entry.locale,
		created_at: entry.createdAt,
	} satisfies Omit<WaitlistSignupRow, "id">;

	const { error } = await supabase.from("waitlist_signups").insert(row);

	if (!error) return "saved";
	if (error.code === "23505") return "duplicate";
	if (isMissingTableError(error.message)) return "missing_table";

	console.error("waitlist supabase insert failed:", error.message);
	return "unavailable";
}

async function saveToSupabase(
	entry: WaitlistEntry,
): Promise<SaveWaitlistResult | null> {
	const supabase = getSupabaseAdmin();
	if (!supabase) return null;

	const tableResult = await saveToSupabaseTable(supabase, entry);
	if (tableResult !== "missing_table") return tableResult;

	return saveToSupabaseStorage(supabase, entry);
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
