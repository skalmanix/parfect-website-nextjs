#!/usr/bin/env node
/**
 * Scan public/images and write src/lib/image-manifest.json mapping each
 * original source to the variant widths that exist on disk.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(ROOT, "src/lib/image-manifest.json");

function walk(dir, files = []) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			walk(full, files);
			continue;
		}
		files.push(full);
	}
	return files;
}

const manifest = {};

for (const filePath of walk(PUBLIC)) {
	const name = path.basename(filePath);
	const match = name.match(/^(.+)-(\d+)w\.webp$/);
	if (!match) continue;

	const base = match[1];
	const width = Number(match[2]);
	const dir = path.dirname(filePath);

	for (const originalName of [`${base}.webp`, `${base}.png`]) {
		const originalPath = path.join(dir, originalName);
		if (!fs.existsSync(originalPath)) continue;

		const src = `/${path.relative(PUBLIC, originalPath).replace(/\\/g, "/")}`;
		manifest[src] ??= [];
		if (!manifest[src].includes(width)) manifest[src].push(width);
	}
}

for (const src of Object.keys(manifest)) {
	manifest[src].sort((a, b) => a - b);
}

fs.writeFileSync(OUT, `${JSON.stringify(manifest, null, "\t")}\n`);
console.log(
	`Wrote manifest with ${Object.keys(manifest).length} sources → ${OUT}`,
);
