import { execSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const WRANGLER_PATH = path.join(ROOT, "wrangler.jsonc");
const BINDING = "WAITLIST_KV";

function getConfiguredNamespaceId(content) {
	const match = content.match(
		/"binding"\s*:\s*"WAITLIST_KV"\s*,\s*"id"\s*:\s*"([^"]+)"/,
	);
	const id = match?.[1];
	if (!id || id.includes("<")) return null;
	return id;
}

function patchWrangler(content, namespaceId) {
	const kvBlock = `\t"kv_namespaces": [{ "binding": "${BINDING}", "id": "${namespaceId}" }],`;

	if (content.includes(`"binding": "${BINDING}"`)) {
		return content.replace(
			/\t"kv_namespaces"\s*:\s*\[\s*\{\s*"binding"\s*:\s*"WAITLIST_KV"\s*,\s*"id"\s*:\s*"[^"]+"\s*\}\s*\],/,
			kvBlock,
		);
	}

	return content.replace(
		/\t\/\/ Waitlist signups[^\n]*\n(?:\t\/\/[^\n]*\n)*/,
		`\t// Waitlist signups (configured by scripts/ensure-waitlist-kv.mjs)\n\t${kvBlock}\n`,
	);
}

async function cloudflareApi(pathname, { method = "GET", body } = {}) {
	const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
	const token = process.env.CLOUDFLARE_API_TOKEN;
	if (!accountId || !token) return null;

	const response = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/${accountId}${pathname}`,
		{
			method,
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: body ? JSON.stringify(body) : undefined,
		},
	);

	const data = await response.json();
	if (!data.success) {
		throw new Error(
			`Cloudflare API ${method} ${pathname} failed: ${JSON.stringify(data.errors ?? data)}`,
		);
	}

	return data.result;
}

async function resolveNamespaceIdViaApi() {
	const namespaces = await cloudflareApi("/storage/kv/namespaces");
	const existing = namespaces.find((namespace) =>
		namespace.title.toUpperCase().includes("WAITLIST"),
	);
	if (existing) return existing.id;

	const created = await cloudflareApi("/storage/kv/namespaces", {
		method: "POST",
		body: { title: "WAITLIST" },
	});
	return created.id;
}

function resolveNamespaceIdViaWrangler() {
	const output = execSync("npx wrangler kv namespace create WAITLIST", {
		cwd: ROOT,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "pipe"],
	});

	const match = output.match(/"id"\s*:\s*"([^"]+)"/) ?? output.match(/id = "([^"]+)"/);
	if (!match) {
		throw new Error("Could not parse KV namespace id from wrangler output.");
	}

	return match[1];
}

async function main() {
	const original = await readFile(WRANGLER_PATH, "utf8");
	const configured = getConfiguredNamespaceId(original);
	if (configured) {
		console.log(`WAITLIST_KV already configured (${configured}).`);
		return configured;
	}

	const fromEnv = process.env.WAITLIST_KV_NAMESPACE_ID?.trim();
	if (fromEnv) {
		const updated = patchWrangler(original, fromEnv);
		await writeFile(WRANGLER_PATH, updated);
		console.log(`Configured WAITLIST_KV from WAITLIST_KV_NAMESPACE_ID (${fromEnv}).`);
		return fromEnv;
	}

	let namespaceId = null;

	if (process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN) {
		namespaceId = await resolveNamespaceIdViaApi();
	} else {
		try {
			namespaceId = resolveNamespaceIdViaWrangler();
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			const stderr =
				error && typeof error === "object" && "stderr" in error
					? String(error.stderr)
					: "";
			const combined = `${message}\n${stderr}`;
			if (
				combined.includes("not authenticated") ||
				combined.includes("CLOUDFLARE_API_TOKEN")
			) {
				console.warn(
					"Skipping WAITLIST KV setup: Cloudflare credentials are not available.",
				);
				console.warn(
					"Authenticate the Cloudflare MCP plugin, run `npx wrangler login`, or set CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_API_TOKEN.",
				);
				return null;
			}
			throw error;
		}
	}

	const updated = patchWrangler(original, namespaceId);
	await writeFile(WRANGLER_PATH, updated);
	console.log(`Configured WAITLIST_KV namespace (${namespaceId}).`);
	return namespaceId;
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
