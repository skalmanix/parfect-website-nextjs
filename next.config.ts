import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { SECURITY_HEADERS } from "./src/lib/security-headers";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
	images: {
		qualities: [50, 60, 65, 70, 75],
		minimumCacheTTL: 31536000,
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [...SECURITY_HEADERS],
			},
			{
				// Static brand assets are content-stable; cache aggressively.
				source: "/images/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/favicon.png",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=86400",
					},
				],
			},
		];
	},
};

export default withNextIntl(nextConfig);

// Dev-only: enables getCloudflareContext() in next dev
if (process.env.NODE_ENV === "development") {
	initOpenNextCloudflareForDev();
}
