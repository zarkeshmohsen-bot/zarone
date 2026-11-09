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
# Purge the host cache (InMotion UltraStack NGINX ignores Cache-Control) for every name this folder serves, then check
# each one answers with Zarone's own page — never another site on the account (incident 2026-11-09, zarone.sazban.com).
for h in ${ZARONE_HOSTS:-zarone.sazban.com}; do  # add zarone.ir once it is hosted here
  curl -sk -A 'Mozilla/5.0' -o /dev/null "https://$h/purge/" || true
  t="$(curl -sk -A 'Mozilla/5.0' --max-time 15 "https://$h/" | grep -o '<title>[^<]*' | head -1)"
  case "$t" in *زروان*) echo "ok $h";; "") echo "skip $h (not reachable)";; *) echo "WRONG SITE on $h: ${t#<title>}";; esac
done
echo "$(date '+%F %T') published ${after:0:7}"
