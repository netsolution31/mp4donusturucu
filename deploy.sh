#!/usr/bin/env bash
# Build for https://mp4donusturucu.com and upload to the N0C account over SSH.
# Requires the "mp4donusturucu" host entry in ~/.ssh/config.
set -euo pipefail
cd "$(dirname "$0")"
MSYS_NO_PATHCONV=1 SITE_URL=https://mp4donusturucu.com BASE=/ node build.mjs
tar czf - -C dist --exclude=.nojekyll --exclude=.git . | ssh mp4donusturucu 'cd public_html && tar xzf - && find . -type d -exec chmod 755 {} + && find . -type f -exec chmod 644 {} +'
echo "https://mp4donusturucu.com/ -> $(curl -s -o /dev/null -w '%{http_code}' https://mp4donusturucu.com/)"
