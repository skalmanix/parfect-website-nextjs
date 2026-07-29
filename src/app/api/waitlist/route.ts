import { saveWaitlistEntry } from "@/lib/waitlist/store";

function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

	const result = await saveWaitlistEntry({
		email,
		locale,
		createdAt: new Date().toISOString(),
	});

	if (result === "duplicate") {
		return Response.json({ error: "duplicate" }, { status: 409 });
	}

	if (result === "unavailable") {
		return Response.json({ error: "generic" }, { status: 503 });
	}

	return Response.json({ ok: true });
}
