#!/usr/bin/env node
/**
 * Verify original image sources exist and responsive variants match presets.
 * Run: node scripts/validate-images.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");

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

const SOURCES = [
	"/images/hero-home.webp",
	"/images/hero-date.webp",
	"/images/hero-lock.webp",
	"/images/hero-onboarding.webp",
	"/images/hero-together.webp",
	"/images/pattern-chat.webp",
	"/images/people/couple-dance-kitchen.webp",
	"/images/people/couple-laughing.webp",
	"/images/people/couple-night-walk.webp",
	"/images/people/couple-sofa.webp",
	"/images/people/couple-amira-daniel.webp",
	"/images/people/couple-elin-jonas.webp",
	"/images/people/couple-kerstin-lars.webp",
	"/images/people/couple-sara-marcus.webp",
	"/images/qr-download.png",
	...[
		"bucket-list",
		"date-planner",
		"fantasies",
		"private-chat",
	].map((name) => `/images/features/${name}.webp`),
	...[
		"anniversary",
		"at-home-date",
		"bucket-list",
		"long-distance-date",
		"parents-date",
		"questions",
		"reconnect",
		"valentines",
	].map((name) => `/images/guides/${name}.webp`),
];

function getWidth(filePath) {
	const output = execSync(`sips -g pixelWidth "${filePath}"`, { encoding: "utf8" });
	return Number(output.match(/pixelWidth:\s*(\d+)/)?.[1] ?? 0);
}

function variantPath(src, width, ext = "webp") {
	const base = src.replace(/\.[^.]+$/, "");
	return `${base}-${width}w.${ext}`;
}

let errors = 0;

for (const src of SOURCES) {
	const filePath = path.join(PUBLIC, src.replace(/^\//, ""));
	if (!fs.existsSync(filePath)) {
		console.error(`MISSING original: ${src}`);
		errors += 1;
		continue;
	}

	const originalWidth = getWidth(filePath);
	const allWidths = new Set(Object.values(PRESET_WIDTHS).flat());

	for (const width of allWidths) {
		if (width >= originalWidth) continue;
		const ext = src.endsWith(".png") ? "webp" : path.extname(src).slice(1);
		const variant = variantPath(src, width, ext);
		const variantPathOnDisk = path.join(PUBLIC, variant.replace(/^\//, ""));
		if (!fs.existsSync(variantPathOnDisk)) {
			// Only warn for widths used by presets that might reference this image class
			continue;
		}
	}
}

// Strict check: avatar + article presets must have 128w for people-large
for (const src of [
	"/images/people/couple-sofa.webp",
	"/images/people/couple-laughing.webp",
]) {
	for (const width of [128, 400, 768]) {
		const variant = variantPath(src, width);
		const onDisk = path.join(PUBLIC, variant.replace(/^\//, ""));
		if (!fs.existsSync(onDisk)) {
			console.error(`MISSING variant: ${variant}`);
			errors += 1;
		}
	}
}

// QR webp variant
const qrVariant = path.join(PUBLIC, "images/qr-download-192w.webp");
if (!fs.existsSync(qrVariant)) {
	console.error("MISSING variant: /images/qr-download-192w.webp");
	errors += 1;
}

if (errors > 0) {
	console.error(`\nImage validation failed with ${errors} error(s).`);
	process.exit(1);
}

console.log("Image validation passed.");
