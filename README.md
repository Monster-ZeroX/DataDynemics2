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

### Deployment Steps

1. Run the preparation script:
   ```bash
   ./prepare-heroku.sh
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

4. Deploy to Heroku:
   ```bash
   git push heroku main
   ```

5. Open your app:
   ```bash
   heroku open
   ```

### Manual Deployment Steps

If you prefer to do the deployment steps manually:

1. Ensure you've created the necessary files:
   - `Procfile` with content: `web: npm start`
   - `.node-version` with content: `20.x`

2. Build your application:
   ```bash
   npm run build
   ```

3. Create a new Heroku app:
   ```bash
   heroku create
   ```

4. Deploy to Heroku:
   ```bash
   git push heroku main
   ```

## Structure

- `/client` - Frontend React application
- `/server` - Backend Express API
- `/shared` - Shared TypeScript types and schemas
- `/data` - JSONL data files for student records