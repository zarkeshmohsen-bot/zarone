#!/bin/bash
# Runs on the hosting account (cron, every 10 minutes). Pulls the public repo, rebuilds, publishes to the docroot.
# Nothing happens when main has not moved. Usage: bash ~/zarone-src/deploy/publish.sh [--force]
# Safety: the first run backs up whatever the docroot holds to ~/zarone-docroot-backup-<date>.tgz; later runs delete
# only files that an earlier run published (listed in $DOCROOT/.zarone-files), never anything else.
set -euo pipefail
SRC="${ZARONE_SRC:-$HOME/zarone-src}"
DOCROOT="${ZARONE_DOCROOT:-$HOME/zarone.ir}"
NODE="${NODE:-$(command -v node || echo /opt/cpanel/ea-nodejs20/bin/node)}"
MANIFEST="$DOCROOT/.zarone-files"
cd "$SRC"
before="$(git rev-parse HEAD)"
git fetch -q origin main
git reset -q --hard origin/main
after="$(git rev-parse HEAD)"
if [ "$before" = "$after" ] && [ "${1:-}" != "--force" ] && [ -f "$MANIFEST" ]; then exit 0; fi
"$NODE" build.mjs
mkdir -p "$DOCROOT"
if [ ! -f "$MANIFEST" ] && [ -n "$(ls -A "$DOCROOT" 2>/dev/null)" ]; then
  backup="$HOME/zarone-docroot-backup-$(date +%Y%m%d-%H%M%S).tgz"
  tar czf "$backup" -C "$DOCROOT" .
  echo "backed up the existing docroot to $backup"
fi
( cd dist && find . -type f | sort ) > "$SRC/.built-files"
if [ -f "$MANIFEST" ]; then
  comm -23 "$MANIFEST" "$SRC/.built-files" | while read -r f; do rm -f "$DOCROOT/$f"; done
fi
cp -a dist/. "$DOCROOT/"
cp "$SRC/.built-files" "$MANIFEST"
curl -sk -A 'Mozilla/5.0' -o /dev/null "https://zarone.ir/purge/" || true
echo "$(date '+%F %T') published ${after:0:7}"
