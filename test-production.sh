#!/bin/bash

# This script builds and tests the production version of the application locally

echo "Building production version..."
npm run build

echo "Starting production server..."
NODE_ENV=production PORT=5001 node dist/index.js