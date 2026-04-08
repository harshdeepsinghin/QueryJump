#!/bin/bash
# build.sh - Packages the extension for Chrome and Firefox

echo "Cleaning up..."
rm -rf dist
rm -f QueryJump-chrome.zip QueryJump-firefox.zip
mkdir -p dist/chrome dist/firefox
mkdir -p dist/chrome/icons dist/firefox/icons

echo "Copying common files..."
FILES="manifest.json background.js options.html options.css options.js"
for f in $FILES; do
  cp "$f" dist/chrome/
  cp "$f" dist/firefox/
done
cp icons/icon*.png dist/chrome/icons/
cp icons/icon*.png dist/firefox/icons/

echo "Building Chrome manifest..."
jq 'del(.background.scripts) | del(.browser_specific_settings)' manifest.json > dist/chrome/manifest.json

echo "Building Firefox manifest..."
jq 'del(.background.service_worker)' manifest.json > dist/firefox/manifest.json

echo "Zipping Chrome extension..."
cd dist/chrome
zip -qr ../../QueryJump-chrome.zip .
cd ../..

echo "Zipping Firefox extension..."
cd dist/firefox
zip -qr ../../QueryJump-firefox.zip .
cd ../..

echo "✅ Build complete! Packages ready:"
echo "- QueryJump-chrome.zip"
echo "- QueryJump-firefox.zip"
