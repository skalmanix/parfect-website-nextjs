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

async function appendViaServer(
	serverUrl: string,
	entry: WaitlistEntry,
): Promise<SaveWaitlistResult> {
	const response = await fetch(serverUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(entry),
	});

	if (response.status === 409) return "duplicate";
	if (!response.ok) return "unavailable";
	return "saved";
}

export async function saveWaitlistEntry(
	entry: WaitlistEntry,
): Promise<SaveWaitlistResult> {
	const serverUrl = process.env.WAITLIST_SERVER_URL?.trim();
	if (serverUrl) {
		return appendViaServer(serverUrl, entry);
	}

	try {
		return await appendToFile(entry);
	} catch {
		return "unavailable";
	}
}
