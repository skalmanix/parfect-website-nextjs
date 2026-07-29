#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Ensuring WAITLIST KV namespace and wrangler.jsonc binding..."
node scripts/ensure-waitlist-kv.mjs

echo ""
echo "Redeploy to apply the binding in production:"
echo "  npm run deploy"
