#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: ./bump_version.sh <new_version>"
  echo "Example: ./bump_version.sh 1.1.0"
  exit 1
fi

VERSION=$1

# Ensure clean working directory
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Error: Working tree is not clean. Commit or stash your changes first."
  exit 1
fi

# Choose portable sed -i syntax (macOS vs Linux)
if sed --version >/dev/null 2>&1; then
  # GNU sed (Linux)
  SED_INPLACE=('sed' '-i')
else
  # BSD sed (macOS)
  SED_INPLACE=('sed' '-i' '')
fi

echo "📝 Updating manifest.json to v$VERSION..."
"${SED_INPLACE[@]}" \
  "s/\"version\"[[:space:]]*:[[:space:]]*\"[^\"]*\"/\"version\": \"$VERSION\"/" \
  manifest.json

echo "🔨 Building release artifacts..."
./build.sh

echo ""
echo "🔄 Committing and tagging..."
git add manifest.json
git commit -m "chore: release v$VERSION"
git tag "v$VERSION"

echo ""
echo "✅ Release v$VERSION prepared!"
echo "📤 Pushing to GitHub..."
git push
git push --tags

echo "Done! Release v$VERSION is live."
