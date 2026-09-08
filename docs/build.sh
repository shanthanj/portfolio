#!/usr/bin/env bash
# Build the deployable dist/ bundle for the S.J. Prashanth website.
#
# Run from the project root:   bash build.sh
#
# Produces dist/ containing only what the live site needs:
#   index.html, robots.txt, css/, js/, media/
# and EXCLUDES:
#   - media/**/_originals/  (full-res photo backups — must not be published)
#   - .gitkeep placeholder files
#   - this script, resize.py, docs, ADDING_EVENTS.md, and any tooling
#
# After it runs, upload the CONTENTS of dist/ to your web root (index.html at root).
set -e

cd "$(dirname "$0")"

rm -rf dist
mkdir dist

cp index.html dist/
[ -f robots.txt ] && cp robots.txt dist/
cp -r css js media dist/

# Strip the full-res backups and placeholders from the bundle.
find dist/media -type d -name _originals -exec rm -rf {} + 2>/dev/null || true
find dist -name .gitkeep -delete 2>/dev/null || true

echo "Built dist/  ->  $(find dist -type f | wc -l) files, $(du -sh dist | cut -f1)"

# Safety check: never publish full-res backups.
if find dist -type d -name _originals | grep -q .; then
  echo "WARNING: _originals found in dist/ — remove before deploying."
fi
