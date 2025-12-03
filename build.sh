#!/bin/bash
set -e

echo "Installing dependencies..."
pnpm install

echo "Building the React application..."
pnpm build

echo "Build completed successfully!"
