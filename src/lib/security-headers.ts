/** Security headers applied to all HTML responses via next.config.ts */

const isDev = process.env.NODE_ENV === "development";

function buildContentSecurityPolicy() {
	const scriptSrc = [
		"'self'",
		"'unsafe-inline'",
		...(isDev ? ["'unsafe-eval'"] : []),
		"https://www.googletagmanager.com",
		"https://www.google-analytics.com",
	];

	const connectSrc = [
		"'self'",
		"https://www.google-analytics.com",
		"https://www.googletagmanager.com",
		"https://*.google-analytics.com",
		"https://*.analytics.google.com",
		...(isDev ? ["ws:", "wss:", "http://localhost:*", "https://localhost:*"] : []),
	];

	return [
		"default-src 'self'",
		`script-src ${scriptSrc.join(" ")}`,
		`connect-src ${connectSrc.join(" ")}`,
		"img-src 'self' data: blob: https:",
		"style-src 'self' 'unsafe-inline'",
		"font-src 'self' data:",
		"frame-src https://www.googletagmanager.com",
		"frame-ancestors 'none'",
		"base-uri 'self'",
		"form-action 'self'",
		"object-src 'none'",
	].join("; ");
}

export const SECURITY_HEADERS = [
	{
		key: "Strict-Transport-Security",
		value: "max-age=31536000; includeSubDomains; preload",
	},
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	{
		key: "X-Frame-Options",
		value: "DENY",
	},
	{
		key: "Referrer-Policy",
		value: "strict-origin-when-cross-origin",
	},
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
	},
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
	{
		key: "Content-Security-Policy",
		value: buildContentSecurityPolicy(),
	},
] as const;
