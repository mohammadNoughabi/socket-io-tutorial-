#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_DIR"

echo "==> Pulling latest changes..."
git pull origin "$(git branch --show-current)"

echo "==> Building and starting containers..."
docker compose up -d --build

echo "==> Done. App is running on port ${PORT:-3000}"
docker compose ps
