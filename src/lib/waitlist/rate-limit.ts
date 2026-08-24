const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function prune(now: number) {
	if (buckets.size < 2_000) return;
	for (const [key, bucket] of buckets) {
		if (now >= bucket.resetAt) buckets.delete(key);
	}
}

export function getClientIp(request: Request) {
	const forwarded = request.headers.get("cf-connecting-ip")
		?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
		?? request.headers.get("x-real-ip");

	return forwarded || "unknown";
}

export function consumeWaitlistQuota(ip: string): {
	ok: boolean;
	retryAfterSec: number;
} {
	const now = Date.now();
	prune(now);

	const current = buckets.get(ip);
	if (!current || now >= current.resetAt) {
		buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
		return { ok: true, retryAfterSec: Math.ceil(WINDOW_MS / 1000) };
	}

	if (current.count >= MAX_REQUESTS) {
		return {
			ok: false,
			retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
		};
	}

	current.count += 1;
	return {
		ok: true,
		retryAfterSec: Math.ceil((current.resetAt - now) / 1000),
	};
}
