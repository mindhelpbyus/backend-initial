#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="telehealth-backend"
REMOTE_URL=""
OWNER="${1:-}"   # optionally pass owner as first arg (e.g. myuser)

pushd "$(dirname "$0")/.." > /dev/null || exit 1
ROOT="$(pwd)"

if command -v gh >/dev/null 2>&1; then
  echo "Using gh CLI to create and push repo..."
  if [ -n "$OWNER" ]; then
    gh repo create "${OWNER}/${REPO_NAME}" --public --source="$ROOT" --remote=origin --push --confirm
  else
    gh repo create "$REPO_NAME" --public --source="$ROOT" --remote=origin --push --confirm
  fi
  popd > /dev/null
  exit 0
fi

if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "gh CLI not found and GITHUB_TOKEN is not set. Install gh or set GITHUB_TOKEN and retry."
  popd > /dev/null
  exit 2
fi

echo "Creating repo via GitHub API..."
curl -s -H "Authorization: token $GITHUB_TOKEN" \
  -d "{"name":"$REPO_NAME","private":false}" \
  https://api.github.com/user/repos | tee /dev/stderr

echo "Pushing local repo..."
git init
git add .
git commit -m "Initial commit - telehealth backend"
git branch -M main
REMOTE_URL="https://github.com/${OWNER:-$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user | jq -r .login)}/$REPO_NAME.git"
git remote add origin "$REMOTE_URL"
git push -u origin main

popd > /dev/null
