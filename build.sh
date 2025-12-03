#!/bin/bash
set -e

echo "Installing dependencies in client directory..."
cd client
pnpm install

echo "Building the React application..."
pnpm build

echo "Build completed successfully!"
