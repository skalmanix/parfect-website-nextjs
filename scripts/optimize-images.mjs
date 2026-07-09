#!/usr/bin/env node
/**
 * Generate width-suffixed WebP variants for responsive srcset delivery.
 * Run: node scripts/optimize-images.mjs
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const GROUPS = [
	{
		label: "mockup",
		files: [
			"images/hero-home.webp",
			"images/hero-date.webp",
			"images/hero-lock.webp",
			"images/hero-onboarding.webp",
			"images/hero-together.webp",
			"images/pattern-chat.webp",
		],
		widths: [640, 768, 1080],
		quality: 82,
	},
	{
		label: "landscape",
		files: [
			...[
				"bucket-list",
				"date-planner",
				"fantasies",
				"private-chat",
			].map((name) => `images/features/${name}.webp`),
			...[
				"anniversary",
				"at-home-date",
				"bucket-list",
				"long-distance-date",
				"parents-date",
				"questions",
				"reconnect",
				"valentines",
			].map((name) => `images/guides/${name}.webp`),
		],
		widths: [360, 768, 1280],
		quality: 82,
	},
	{
		label: "people-large",
		files: [
			"images/people/couple-dance-kitchen.webp",
			"images/people/couple-laughing.webp",
			"images/people/couple-night-walk.webp",
			"images/people/couple-sofa.webp",
		],
		widths: [400, 768, 1280],
		quality: 80,
	},
	{
		label: "people-small",
		files: [
			"images/people/couple-amira-daniel.webp",
			"images/people/couple-elin-jonas.webp",
			"images/people/couple-kerstin-lars.webp",
			"images/people/couple-sara-marcus.webp",
		],
		widths: [128, 400],
		quality: 85,
	},
	{
		label: "qr",
		files: ["images/qr-download.png"],
		widths: [192],
		quality: 90,
		outputExt: "webp",
	},
];

function getDimensions(filePath) {
	const output = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}"`, {
		encoding: "utf8",
	});
	const width = Number(output.match(/pixelWidth:\s*(\d+)/)?.[1] ?? 0);
	const height = Number(output.match(/pixelHeight:\s*(\d+)/)?.[1] ?? 0);
	return { width, height };
}

function variantPath(srcPath, width, outputExt) {
	const ext = outputExt ?? path.extname(srcPath).slice(1);
	const base = srcPath.replace(/\.[^.]+$/, "");
	return `${base}-${width}w.${ext}`;
}

function resizeWithCwebp(input, output, width, quality) {
	const { width: originalWidth, height: originalHeight } = getDimensions(input);
	const targetWidth = Math.min(width, originalWidth);
	const targetHeight = Math.round((originalHeight / originalWidth) * targetWidth);
	execSync(
		`cwebp -resize ${targetWidth} ${targetHeight} -q ${quality} "${input}" -o "${output}"`,
		{ stdio: "pipe" },
	);
}

let created = 0;
let skipped = 0;

for (const group of GROUPS) {
	for (const relativePath of group.files) {
		const input = path.join(PUBLIC, relativePath);
		if (!fs.existsSync(input)) {
			console.warn(`skip missing: ${relativePath}`);
			skipped += 1;
			continue;
		}

		const { width: originalWidth } = getDimensions(input);

		for (const width of group.widths) {
			if (width >= originalWidth) {
				skipped += 1;
				continue;
			}

			const output = variantPath(input, width, group.outputExt);
			if (fs.existsSync(output)) {
				skipped += 1;
				continue;
			}

			resizeWithCwebp(input, output, width, group.quality);
			const size = fs.statSync(output).size;
			console.log(
				`${group.label}: ${path.relative(PUBLIC, output)} (${Math.round(size / 1024)} KiB)`,
			);
			created += 1;
		}
	}
}

console.log(`\nDone. Created ${created} variants, skipped ${skipped}.`);
