#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/landings"

echo "🔧 Landing Center — Setup"
echo "Root: $ROOT"
echo "Dest: $DEST"
echo ""

rm -rf "$DEST"
mkdir -p "$DEST"

# ── Static landings (just copy files) ──────────────────────────
copy_static() {
  local name="$1"
  echo "📁 Copying $name (static)..."
  mkdir -p "$DEST/$name"
  cp "$ROOT/$name/index.html" "$DEST/$name/"
  cp "$ROOT/$name/styles.css" "$DEST/$name/" 2>/dev/null || true
  cp "$ROOT/$name/script.js" "$DEST/$name/" 2>/dev/null || true
  if [ -d "$ROOT/$name/assets" ]; then
    cp -r "$ROOT/$name/assets" "$DEST/$name/"
  fi
}

# ── React/Vite landings (build, then copy dist) ───────────────
build_react() {
  local name="$1"
  echo "⚙️  Building $name (React/Vite)..."
  cd "$ROOT/$name"

  npm install --silent 2>/dev/null || true

  # Patch BrowserRouter with basename for subpath serving
  if grep -q '<BrowserRouter>' src/App.tsx 2>/dev/null; then
    cp src/App.tsx src/App.tsx.bak
    sed -i '' "s|<BrowserRouter>|<BrowserRouter basename=\"/landings/$name/\">|" src/App.tsx
    echo "   ↳ Patched BrowserRouter with basename"
  fi

  npx vite build --base="/landings/$name/" 2>&1 | tail -3
  cp -r dist "$DEST/$name"

  # Restore original source
  if [ -f src/App.tsx.bak ]; then
    mv src/App.tsx.bak src/App.tsx
    echo "   ↳ Restored original App.tsx"
  fi

  echo "   ✅ $name built"
}

# ── Run ────────────────────────────────────────────────────────
copy_static "landing1"
copy_static "landing4"
build_react "landing2"
build_react "landing3"
build_react "landing5"

echo ""
echo "✅ All landings ready in $DEST"
echo ""
ls -la "$DEST"
