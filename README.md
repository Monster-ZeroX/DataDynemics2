# Student Results Explorer

A full-stack web application for searching and viewing student examination results from JSONL data files.

## Features

- Search interface that lets you find students by name
- Live search results displaying students as you type
- Detailed student view showing grades and rankings
- Responsive design that works on different device sizes
- Keyboard navigation support

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Express, Node.js
- **Data**: In-memory storage with JSONL data files

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5000`

## Deployment to Heroku

### Prerequisites

1. Create a [Heroku account](https://signup.heroku.com/) if you don't have one
2. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Login to Heroku CLI:
   ```bash
   heroku login
   ```

### Heroku One-Click Deployment

The simplest way to deploy this application to Heroku is by clicking the button below:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Windows Manual Deployment Steps

1. Run the preparation script:
   ```cmd
   prepare-heroku.bat
   ```

2. Initialize a Git repository (if not already done):
   ```cmd
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Create a new Heroku app:
   ```cmd
   heroku create
   ```

4. Set the Node.js buildpack:
   ```cmd
   heroku buildpacks:set heroku/nodejs
   ```
   
5. Tell Heroku to install all dependencies (including dev dependencies):
   ```cmd
   heroku config:set NPM_CONFIG_PRODUCTION=false
   ```

6. Add the environment variable to specify where to find data:
   ```cmd
   heroku config:set DATA_DIR=data
   ```

7. Deploy to Heroku:
   ```cmd
   git push heroku main
   ```
   Note: If your branch is named 'master', use:
   ```cmd
   git push heroku master
   ```

8. Open your app:
   ```cmd
   heroku open
   ```

### Linux/Mac Deployment Steps

1. Run the preparation script:
   ```bash
   bash prepare-heroku.sh
   ```

2. Initialize a Git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Create a new Heroku app:
   ```bash
   heroku create
   ```

4. Set the Node.js buildpack:
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```
   
5. Tell Heroku to install all dependencies (including dev dependencies):
   ```bash
   heroku config:set NPM_CONFIG_PRODUCTION=false
   ```

6. Add the environment variable to specify where to find data:
   ```bash
   heroku config:set DATA_DIR=data
   ```

7. Deploy to Heroku:
   ```bash
   git push heroku main
   ```

8. Open your app:
   ```bash
   heroku open
   ```

### Troubleshooting Heroku Deployment

If you encounter issues during deployment:

1. Check the Heroku logs:
   ```cmd
   heroku logs --tail
   ```

2. If you see errors related to missing dependencies:
   ```cmd
   heroku config:set NPM_CONFIG_PRODUCTION=false
   git commit --allow-empty -m "Trigger rebuild"
   git push heroku main
   ```

3. If you encounter module system compatibility issues (ESM vs CommonJS):
   ```cmd
   # Add NODE_OPTIONS to help resolve module issues
   heroku config:set NODE_OPTIONS="--no-warnings --experimental-specifier-resolution=node"
   git commit --allow-empty -m "Update Node options"
   git push heroku main
   ```

4. If the application crashes on startup, try restarting it:
   ```cmd
   heroku restart
   ```

5. Make sure you've correctly copied the data files:
   ```cmd
   heroku run ls -la data
   ```

6. To test your production environment locally before deploying:
   ```bash
   # On Linux/Mac
   bash test-production.sh
   
   # On Windows
   node heroku-build.cjs
   ```

## Structure

- `/client` - Frontend React application
- `/server` - Backend Express API
- `/shared` - Shared TypeScript types and schemas
- `/data` - JSONL data files for student records

## Heroku Deployment Files

The following files are specifically created for Heroku deployment:

- `Procfile` - Instructs Heroku how to start the application
- `.npmrc` - NPM configuration file to include dev dependencies
- `heroku-server.cjs` - CommonJS version of the server startup script
- `heroku-build.cjs` - Script for building the application on Heroku
- `heroku-postbuild.cjs` - Post-build steps for Heroku deployments
- `prepare-heroku.sh` - Script to prepare the application for deployment on Linux/Mac
- `prepare-heroku.bat` - Script to prepare the application for deployment on Windows
- `test-production.sh` - Test script to validate production environment locally
- `app.json` - Configuration for Heroku one-click deployments

These files handle the necessary conversions between ES Modules and CommonJS to ensure compatibility with the Heroku environment. The preparation scripts ensure that all required files are in the correct locations before deployment.