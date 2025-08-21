#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Building healthcare lambdas..."

echo "Building patients lambda..."
pushd "$ROOT_DIR/src/lambdas/patients" > /dev/null
npm install
npm run build
if [ ! -d "dist" ]; then
  echo "patients dist not generated"
  exit 1
fi
popd > /dev/null
echo "Patients lambda build complete."

echo "Building doctors lambda..."
pushd "$ROOT_DIR/src/lambdas/doctors" > /dev/null
npm install
npm run build
if [ ! -d "dist" ]; then
  echo "doctors dist not generated"
  exit 1
fi
popd > /dev/null
echo "Doctors lambda build complete."

echo "All lambda builds complete."
