import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { GUIDES_EN } from "../src/lib/guides/en/index.js";

const outDir = join(process.cwd(), "messages/en");
mkdirSync(outDir, { recursive: true });

const guidesRecord: Record<string, unknown> = {};
for (const guide of GUIDES_EN) {
	const { slug, ...rest } = guide;
	guidesRecord[slug] = rest;
}

writeFileSync(
	join(outDir, "guides-content.json"),
	JSON.stringify({ guides: guidesRecord }, null, "\t") + "\n",
);

console.log(`Exported ${GUIDES_EN.length} guides to messages/en/guides-content.json`);
