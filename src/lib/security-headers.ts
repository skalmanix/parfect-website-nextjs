/** Security headers applied to all HTML responses via next.config.ts */

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
		value: [
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
			"connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
			"img-src 'self' data: blob: https:",
			"style-src 'self' 'unsafe-inline'",
			"font-src 'self' data:",
			"frame-src https://www.googletagmanager.com",
			"frame-ancestors 'none'",
			"base-uri 'self'",
			"form-action 'none'",
			"object-src 'none'",
		].join("; "),
	},
] as const;
