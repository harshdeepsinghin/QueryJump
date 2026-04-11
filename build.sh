#!/bin/bash
set -e

# Read version from manifest.json
VERSION=$(jq -r '.version' manifest.json)

echo "🔨 Building QueryJump v$VERSION..."
echo ""

# Clean previous builds
rm -rf dist QueryJump-Chrome-v*.zip QueryJump-Firefox-v*.zip

# Prepare directories
mkdir -p dist/chrome dist/firefox
mkdir -p dist/chrome/icons dist/firefox/icons

echo "📋 Copying common files..."
FILES="manifest.json background.js options.html options.css options.js"
for f in $FILES; do
  cp "$f" dist/chrome/
  cp "$f" dist/firefox/
done
cp icons/icon*.png dist/chrome/icons/
cp icons/icon*.png dist/firefox/icons/

echo "🔧 Building Chrome manifest (MV3)..."
jq 'del(.background.scripts) | del(.browser_specific_settings)' manifest.json > dist/chrome/manifest.json

echo "🔧 Building Firefox manifest (MV2)..."
jq 'del(.background.service_worker)' manifest.json > dist/firefox/manifest.json

echo "📦 Creating Chrome zip..."
cd dist/chrome
zip -q -r "../../QueryJump-Chrome-v${VERSION}.zip" . -x "*.DS_Store" "__MACOSX/*"
cd ../..

echo "📦 Creating Firefox zip..."
cd dist/firefox
zip -q -r "../../QueryJump-Firefox-v${VERSION}.zip" . -x "*.DS_Store" "__MACOSX/*"
cd ../..

echo ""
echo "✅ Build complete! Packages ready:"
echo "   - QueryJump-Chrome-v${VERSION}.zip"
echo "   - QueryJump-Firefox-v${VERSION}.zip"
