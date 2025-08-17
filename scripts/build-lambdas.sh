#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Building patients lambda..."
pushd "$ROOT_DIR/src/lambdas/patients" > /dev/null
npm install
npm run build
if [ ! -d "dist" ]; then
  echo "dist not generated"
  exit 1
fi
popd > /dev/null
echo "Build complete."
