#!/bin/bash
# Runs on the hosting account (cron, every 10 minutes). Pulls the public repo, rebuilds, publishes to the docroot.
# Nothing happens when main has not moved. Usage: bash ~/zarone-src/deploy/publish.sh [--force]
set -euo pipefail
SRC="${ZARONE_SRC:-$HOME/zarone-src}"
DOCROOT="${ZARONE_DOCROOT:-$HOME/zarone.ir}"
NODE="${NODE:-$(command -v node || echo /opt/cpanel/ea-nodejs20/bin/node)}"
cd "$SRC"
before="$(git rev-parse HEAD)"
git fetch -q origin main
git reset -q --hard origin/main
after="$(git rev-parse HEAD)"
if [ "$before" = "$after" ] && [ "${1:-}" != "--force" ] && [ -f "$DOCROOT/index.html" ]; then exit 0; fi
"$NODE" build.mjs
mkdir -p "$DOCROOT"
# publish: copy new files, then remove files that are no longer built (keep .well-known for the certificate)
cp -a dist/. "$DOCROOT/"
( cd dist && find . -type f | sort ) > /tmp/zarone-built.$$
( cd "$DOCROOT" && find . -type f -not -path "./.well-known/*" -not -name "*.log" | sort ) | comm -13 /tmp/zarone-built.$$ - | while read -r f; do rm -f "$DOCROOT/$f"; done
rm -f /tmp/zarone-built.$$
curl -sk -A 'Mozilla/5.0' -o /dev/null "https://zarone.ir/purge/" || true
echo "$(date '+%F %T') published ${after:0:7}"
