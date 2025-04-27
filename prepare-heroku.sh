#!/bin/bash

echo "Preparing application for Heroku deployment..."

# Ensure data directory exists
mkdir -p data
mkdir -p dist/data

# Copy JSONL data files to the data directories
echo "Copying JSONL data files..."
cp attached_assets/*.jsonl data/ 2>/dev/null || :
cp attached_assets/*.jsonl dist/data/ 2>/dev/null || :

# Create Heroku specific files if they don't exist
if [ ! -f Procfile ]; then
  echo "Creating Procfile..."
  echo "web: node heroku-server.js" > Procfile
fi

if [ ! -f .node-version ]; then
  echo "Creating .node-version file..."
  echo "20.x" > .node-version
fi

echo "Creating Heroku-specific files..."
# Create a .npmrc file to include dev dependencies during install
echo "include=dev" > .npmrc

echo "Preparation complete! Your application is ready for Heroku deployment."
echo
echo "Next steps:"
echo "1. Create a Heroku app: heroku create"
echo "2. Add buildpack: heroku buildpacks:set heroku/nodejs"
echo "3. Deploy to Heroku: git push heroku main"
echo "4. Open your app: heroku open"