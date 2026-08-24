import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const key = process.env.SUPABASE_SECRET_KEY?.trim();
if (!key) {
	console.error(
		"SUPABASE_SECRET_KEY is required to write a Wrangler secrets file.",
	);
	process.exit(1);
}

const dir = mkdtempSync(join(tmpdir(), "parfect-secrets-"));
const secretsFile = join(dir, "secrets.env");
writeFileSync(secretsFile, `SUPABASE_SECRET_KEY=${key}\n`, "utf8");
process.stdout.write(secretsFile);
