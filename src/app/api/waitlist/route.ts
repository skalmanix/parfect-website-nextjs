import { locales } from "@/i18n/routing";
import { consumeWaitlistQuota, getClientIp } from "@/lib/waitlist/rate-limit";
import { saveWaitlistEntry } from "@/lib/waitlist/store";

const MAX_BODY_BYTES = 2048;
const MAX_EMAIL_LENGTH = 254;
const ALLOWED_LOCALES = new Set<string>(locales);

const ALLOWED_ORIGINS = new Set([
	"https://parfect.app",
	"https://www.parfect.app",
	"http://localhost:3000",
	"http://127.0.0.1:3000",
]);

function isValidEmail(email: string) {
	if (email.length > MAX_EMAIL_LENGTH) return false;
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAllowedOrigin(origin: string | null) {
	if (!origin) return true;
	return ALLOWED_ORIGINS.has(origin);
}

export async function POST(request: Request) {
	const quota = consumeWaitlistQuota(getClientIp(request));
	if (!quota.ok) {
		return Response.json(
			{ error: "generic" },
			{
				status: 429,
				headers: { "Retry-After": String(quota.retryAfterSec) },
			},
		);
	}

	if (!isAllowedOrigin(request.headers.get("origin"))) {
		return Response.json({ error: "invalid" }, { status: 400 });
	}

	const raw = await request.text();
	if (raw.length > MAX_BODY_BYTES) {
		return Response.json({ error: "invalid" }, { status: 400 });
	}

	let body: { email?: string; locale?: string };
	try {
		body = JSON.parse(raw) as { email?: string; locale?: string };
	} catch {
		return Response.json({ error: "invalid" }, { status: 400 });
	}

	const email = body.email?.trim() ?? "";
	const locale = ALLOWED_LOCALES.has(body.locale?.trim() ?? "")
		? body.locale!.trim()
		: "en";

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
