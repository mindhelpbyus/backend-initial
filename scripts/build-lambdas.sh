#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Building healthcare lambdas..."

# Install dependencies at root level for development
echo "Installing dependencies at root level..."
pushd "$ROOT_DIR" > /dev/null
npm install
popd > /dev/null

echo "Building patients lambda..."
pushd "$ROOT_DIR/src/lambdas/patients" > /dev/null
# Use root node_modules for TypeScript compilation
PATH="$ROOT_DIR/node_modules/.bin:$PATH" npm run build
if [ ! -d "dist" ]; then
  echo "patients dist not generated"
  exit 1
fi
popd > /dev/null
echo "Patients lambda build complete."

echo "Building doctors lambda..."
pushd "$ROOT_DIR/src/lambdas/doctors" > /dev/null
# Use root node_modules for TypeScript compilation
PATH="$ROOT_DIR/node_modules/.bin:$PATH" npm run build
if [ ! -d "dist" ]; then
  echo "doctors dist not generated"
  exit 1
fi
popd > /dev/null
echo "Doctors lambda build complete."

echo "All lambda builds complete."
echo "Note: Dependencies will be bundled by CDK during deployment."
