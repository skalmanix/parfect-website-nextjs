import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const LOCALES = ["en", "sv", "no", "da", "de", "es"];
const FILES = [
	"common.json",
	"metadata.json",
	"home.json",
	"features.json",
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
}
