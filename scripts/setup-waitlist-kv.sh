#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v wrangler >/dev/null 2>&1; then
  echo "wrangler not found. Run: npm install"
  exit 1
fi

echo "Creating WAITLIST KV namespace..."
CREATE_OUTPUT=$(npx wrangler kv namespace create WAITLIST)
echo "$CREATE_OUTPUT"

NAMESPACE_ID=$(echo "$CREATE_OUTPUT" | sed -n 's/.*id = "\([^"]*\)".*/\1/p' | head -1)

if [ -z "$NAMESPACE_ID" ]; then
  echo "Could not parse namespace id from wrangler output."
  exit 1
fi

echo ""
echo "Add this to wrangler.jsonc (uncomment kv_namespaces):"
echo "  \"kv_namespaces\": [{ \"binding\": \"WAITLIST_KV\", \"id\": \"$NAMESPACE_ID\" }],"
echo ""
echo "Then redeploy: npm run deploy"
