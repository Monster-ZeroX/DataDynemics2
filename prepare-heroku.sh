#!/bin/bash

# This script prepares the application for Heroku deployment

echo "Preparing application for Heroku deployment..."

# Ensure data directory exists
mkdir -p data
mkdir -p dist/data

# Copy JSONL data files to the data directories
echo "Copying JSONL data files..."
cp attached_assets/*.jsonl data/
cp attached_assets/*.jsonl dist/data/

# Create Heroku specific files if they don't exist
if [ ! -f "Procfile" ]; then
  echo "Creating Procfile..."
  echo "web: npm start" > Procfile
fi

if [ ! -f ".node-version" ]; then
  echo "Creating .node-version file..."
  echo "20.x" > .node-version
fi

echo "Preparation complete! Your application is ready for Heroku deployment."
echo ""
echo "Next steps:"
echo "1. Create a Heroku app: heroku create"
echo "2. Deploy to Heroku: git push heroku main"
echo "3. Open your app: heroku open"