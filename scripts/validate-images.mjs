#!/usr/bin/env node
/**
 * Verify original images exist and srcset variants match the manifest.
 * Run: node scripts/validate-images.mjs
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const MANIFEST = JSON.parse(
	fs.readFileSync(path.join(ROOT, "src/lib/image-manifest.json"), "utf8"),
);

const PRESET_WIDTHS = {
	menuThumb: [360],
	guideCard: [360, 768, 1280],
	article: [360, 640, 768, 1280],
	heroBg: [400, 640, 768, 1280],
	portraitCard: [400, 768],
	storyPortrait: [400, 768],
	testimonialHero: [768, 1280],
	avatarXs: [128],
	avatarSm: [128, 400],
	avatarMd: [128, 400],
	avatarLg: [128, 400],
	mockup: [640, 768],
	featureDeco: [640, 768],
	qr: [192],
};

const CRITICAL = [
	["/images/hero-onboarding.webp", "article"],
	["/images/people/couple-sofa.webp", "avatarLg"],
	["/images/guides/at-home-date.webp", "guideCard"],
	["/images/people/couple-laughing.webp", "testimonialHero"],
	["/images/qr-download.png", "qr"],
];

let errors = 0;

for (const [src, preset] of CRITICAL) {
	const filePath = path.join(PUBLIC, src.replace(/^\//, ""));
	if (!fs.existsSync(filePath)) {
		console.error(`MISSING original: ${src}`);
		errors += 1;
		continue;
	}

	const widths = PRESET_WIDTHS[preset];
	const available = MANIFEST[src] ?? [];
	const emitted = widths.filter((width) => available.includes(width));

	if (emitted.length === 0) {
		console.error(`NO srcset variants for ${src} (preset: ${preset})`);
		errors += 1;
		continue;
	}

	for (const width of emitted) {
		const ext = preset === "qr" ? "webp" : path.extname(src).slice(1);
		const variant = src.replace(/\.[^.]+$/, `-${width}w.${ext}`);
		const onDisk = path.join(PUBLIC, variant.replace(/^\//, ""));
		if (!fs.existsSync(onDisk)) {
			console.error(`MISSING variant file: ${variant}`);
			errors += 1;
		}
	}

	for (const width of widths) {
		if (available.includes(width)) continue;
		const ext = preset === "qr" ? "webp" : path.extname(src).slice(1);
		const variant = src.replace(/\.[^.]+$/, `-${width}w.${ext}`);
		const onDisk = path.join(PUBLIC, variant.replace(/^\//, ""));
		if (fs.existsSync(onDisk)) {
			console.error(`Manifest missing width ${width} for ${src}`);
			errors += 1;
		}
	}
}

if (errors > 0) {
	console.error(`\nImage validation failed with ${errors} error(s).`);
	process.exit(1);
}

console.log("Image validation passed.");
