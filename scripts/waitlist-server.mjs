#!/usr/bin/env node
/**
 * Minimal waitlist API that appends signups to a JSON file.
 * Run on a server with a writable filesystem (e.g. Linode behind api.parfect.app).
 *
 *   WAITLIST_FILE=/var/lib/parfect/waitlist.json node scripts/waitlist-server.mjs
 */
import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.WAITLIST_PORT ?? 3847);
const HOST = process.env.WAITLIST_HOST ?? "127.0.0.1";
const FILE =
	process.env.WAITLIST_FILE ?? path.join(ROOT, "data", "waitlist.json");
const TOKEN = process.env.WAITLIST_TOKEN?.trim();

function normalizeEmail(email) {
	return email.trim().toLowerCase();
}

function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readEntries() {
	try {
		return JSON.parse(await readFile(FILE, "utf8"));
	} catch {
		return [];
	}
}

async function appendEntry(entry) {
	const normalized = normalizeEmail(entry.email);
	const entries = await readEntries();

	if (entries.some((item) => normalizeEmail(item.email) === normalized)) {
		return "duplicate";
	}

	entries.push({ ...entry, email: normalized });
	await mkdir(path.dirname(FILE), { recursive: true });
	await writeFile(FILE, JSON.stringify(entries, null, 2));
	return "saved";
}

function readJsonBody(request) {
	return new Promise((resolve, reject) => {
		const chunks = [];
		request.on("data", (chunk) => chunks.push(chunk));
		request.on("end", () => {
			try {
				resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"));
			} catch (error) {
				reject(error);
			}
		});
		request.on("error", reject);
	});
}

function sendJson(response, status, body) {
	response.writeHead(status, { "Content-Type": "application/json" });
	response.end(JSON.stringify(body));
}

createServer(async (request, response) => {
	if (request.method === "OPTIONS") {
		response.writeHead(204, {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		});
		response.end();
		return;
	}

	if (TOKEN) {
		const auth = request.headers.authorization;
		if (auth !== `Bearer ${TOKEN}`) {
			sendJson(response, 401, { error: "unauthorized" });
			return;
		}
	}

	if (request.method !== "POST" || request.url !== "/waitlist") {
		sendJson(response, 404, { error: "not_found" });
		return;
	}

	try {
		const body = await readJsonBody(request);
		const email = String(body.email ?? "").trim();
		const locale = String(body.locale ?? "en").trim() || "en";

		if (!isValidEmail(email)) {
			sendJson(response, 400, { error: "invalid" });
			return;
		}

		const result = await appendEntry({
			email,
			locale,
			createdAt: body.createdAt ?? new Date().toISOString(),
		});

		if (result === "duplicate") {
			sendJson(response, 409, { error: "duplicate" });
			return;
		}

		sendJson(response, 200, { ok: true });
	} catch {
		sendJson(response, 500, { error: "generic" });
	}
}).listen(PORT, HOST, () => {
	console.log(`Waitlist server listening on http://${HOST}:${PORT}/waitlist`);
	console.log(`Writing signups to ${FILE}`);
});
