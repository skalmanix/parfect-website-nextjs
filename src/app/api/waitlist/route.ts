import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type WaitlistEntry = {
	email: string;
	locale: string;
	createdAt: string;
};

const WAITLIST_FILE = path.join(process.cwd(), ".data", "waitlist.json");

function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readEntries(): Promise<WaitlistEntry[]> {
	try {
		const raw = await readFile(WAITLIST_FILE, "utf8");
		return JSON.parse(raw) as WaitlistEntry[];
	} catch {
		return [];
	}
}

async function saveEntry(entry: WaitlistEntry) {
	await mkdir(path.dirname(WAITLIST_FILE), { recursive: true });
	const entries = await readEntries();
	const normalized = entry.email.trim().toLowerCase();

	if (entries.some((item) => item.email.toLowerCase() === normalized)) {
		return "duplicate" as const;
	}

	entries.push({ ...entry, email: normalized });
	await writeFile(WAITLIST_FILE, JSON.stringify(entries, null, 2));
	return "saved" as const;
}

async function forwardToWebhook(entry: WaitlistEntry) {
	const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
	if (!webhookUrl) return false;

	const response = await fetch(webhookUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(entry),
	});

	return response.ok;
}

export async function POST(request: Request) {
	let body: { email?: string; locale?: string };

	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "invalid" }, { status: 400 });
	}

	const email = body.email?.trim() ?? "";
	const locale = body.locale?.trim() || "en";

	if (!isValidEmail(email)) {
		return Response.json({ error: "invalid" }, { status: 400 });
	}

	const entry: WaitlistEntry = {
		email,
		locale,
		createdAt: new Date().toISOString(),
	};

	if (process.env.WAITLIST_WEBHOOK_URL) {
		const forwarded = await forwardToWebhook(entry);
		if (!forwarded) {
			return Response.json({ error: "generic" }, { status: 502 });
		}
		return Response.json({ ok: true });
	}

	if (process.env.NODE_ENV === "development") {
		const result = await saveEntry(entry);
		if (result === "duplicate") {
			return Response.json({ error: "duplicate" }, { status: 409 });
		}
		return Response.json({ ok: true });
	}

	return Response.json({ error: "generic" }, { status: 503 });
}
