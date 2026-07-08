import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const LOCALES = ["en", "sv", "no", "da", "de", "es"];
const GUIDE_SLUGS = [
	"date-night-ideas-at-home",
	"date-ideas-for-parents",
	"long-distance-date-ideas",
	"questions-for-couples",
	"how-to-reconnect-with-your-partner",
	"couples-bucket-list-ideas",
	"valentines-day-date-ideas",
	"anniversary-date-ideas",
];

// features.json is loaded separately by feature-pages.tsx (server-only).
const FILES = [
	"common.json",
	"metadata.json",
	"home.json",
	"guides-ui.json",
	"legal.json",
	"legal-pages.json",
	"download.json",
	"app.json",
	"faq.json",
	"about.json",
];

const outDir = path.join(root, "messages", "bundled");
fs.mkdirSync(outDir, { recursive: true });

const guidesNav = {};

for (const locale of LOCALES) {
	const merged = {};

	for (const file of FILES) {
		const filePath = path.join(root, "messages", locale, file);
		const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
		Object.assign(merged, data);
	}

	const outPath = path.join(outDir, `${locale}.json`);
	fs.writeFileSync(outPath, JSON.stringify(merged));
	console.log(`Bundled ${locale} → ${outPath}`);

	const guidesContent = JSON.parse(
		fs.readFileSync(
			path.join(root, "messages", locale, "guides-content.json"),
			"utf8",
		),
	);

	guidesNav[locale] = GUIDE_SLUGS.map((slug) => {
		const guide = guidesContent.guides[slug];
		return {
			slug,
			cardTitle: guide.cardTitle,
			cluster: guide.cluster,
			seasonal: guide.seasonal ?? false,
			image: { src: guide.image.src },
		};
	});
}

fs.writeFileSync(
	path.join(outDir, "guides-nav.json"),
	JSON.stringify(guidesNav),
);
console.log("Bundled guides-nav → messages/bundled/guides-nav.json");
