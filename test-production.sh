#!/bin/bash

# This script simulates a production environment for testing before deployment

echo "Testing production environment setup..."

# Set environment to production
export NODE_ENV=production

# Try running the deployment scripts to check for any syntax errors
echo "Testing heroku-build.cjs..."
node heroku-build.cjs || echo "Error running heroku-build.cjs"

echo "Testing heroku-postbuild.cjs..."
node heroku-postbuild.cjs || echo "Error running heroku-postbuild.cjs"

echo "Testing heroku-server.cjs..."
# Just check syntax, don't actually run the server
node --check heroku-server.cjs || echo "Error checking heroku-server.cjs syntax"

echo "Test complete!"