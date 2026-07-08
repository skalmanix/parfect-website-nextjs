import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
	// Serve prerendered pages from Workers Static Assets instead of
	// re-running the Next.js server on every request (fixes Error 1102).
	incrementalCache: staticAssetsIncrementalCache,
	// Skip NextServer entirely on cache hits — major CPU savings on Workers.
	enableCacheInterception: true,
});
