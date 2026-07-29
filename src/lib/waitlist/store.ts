export type WaitlistEntry = {
	email: string;
	locale: string;
	createdAt: string;
};

export type SaveWaitlistResult = "saved" | "duplicate" | "unavailable";

function entryKey(email: string) {
	return `email:${email.trim().toLowerCase()}`;
}

async function saveToKv(
	kv: KVNamespace,
	entry: WaitlistEntry,
): Promise<SaveWaitlistResult> {
	const key = entryKey(entry.email);
	const existing = await kv.get(key);
	if (existing) return "duplicate";

	await kv.put(key, JSON.stringify(entry));
	return "saved";
}

async function saveToKvViaApi(
	entry: WaitlistEntry,
): Promise<SaveWaitlistResult | null> {
	const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
	const namespaceId = process.env.WAITLIST_KV_NAMESPACE_ID;
	const token = process.env.CLOUDFLARE_API_TOKEN;
	if (!accountId || !namespaceId || !token) return null;

	const key = entryKey(entry.email);
	const base = `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${encodeURIComponent(key)}`;
	const headers = { Authorization: `Bearer ${token}` };

	const existing = await fetch(base, { headers });
	if (existing.ok) return "duplicate";

	const response = await fetch(base, {
		method: "PUT",
		headers: { ...headers, "Content-Type": "application/json" },
		body: JSON.stringify(entry),
	});

	return response.ok ? "saved" : "unavailable";
}

async function forwardToWebhook(entry: WaitlistEntry): Promise<boolean> {
	const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
	if (!webhookUrl) return false;

	const response = await fetch(webhookUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(entry),
	});

	return response.ok;
}

async function saveToFile(entry: WaitlistEntry): Promise<SaveWaitlistResult> {
	const { mkdir, readFile, writeFile } = await import("node:fs/promises");
	const path = await import("node:path");

	const file = path.join(process.cwd(), ".data", "waitlist.json");
	let entries: WaitlistEntry[] = [];

	try {
		entries = JSON.parse(await readFile(file, "utf8")) as WaitlistEntry[];
	} catch {
		entries = [];
	}

	const normalized = entry.email.trim().toLowerCase();
	if (entries.some((item) => item.email.toLowerCase() === normalized)) {
		return "duplicate";
	}

	await mkdir(path.dirname(file), { recursive: true });
	entries.push({ ...entry, email: normalized });
	await writeFile(file, JSON.stringify(entries, null, 2));
	return "saved";
}

async function getKvBinding(): Promise<KVNamespace | null> {
	try {
		const { getCloudflareContext } = await import("@opennextjs/cloudflare");
		const { env } = getCloudflareContext();
		const kv = (env as CloudflareEnv).WAITLIST_KV;
		return kv ?? null;
	} catch {
		return null;
	}
}

export async function saveWaitlistEntry(
	entry: WaitlistEntry,
): Promise<SaveWaitlistResult> {
	if (process.env.WAITLIST_WEBHOOK_URL) {
		const forwarded = await forwardToWebhook(entry);
		return forwarded ? "saved" : "unavailable";
	}

	const kv = await getKvBinding();
	if (kv) {
		return saveToKv(kv, entry);
	}

	const viaApi = await saveToKvViaApi(entry);
	if (viaApi) return viaApi;

	if (process.env.NODE_ENV === "development") {
		return saveToFile(entry);
	}

	return "unavailable";
}
