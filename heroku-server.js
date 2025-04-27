#!/usr/bin/env node

/**
 * Production server entry point for Heroku
 */
const path = require('path');
const fs = require('fs');
const { execSync, spawn } = require('child_process');

// Ensure data directories exist
const dirs = ['data', path.join('dist', 'data')];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Check for data files and copy them if needed
const sourceDir = 'attached_assets';
if (fs.existsSync(sourceDir)) {
  const jsonlFiles = fs.readdirSync(sourceDir).filter(file => file.endsWith('.jsonl'));
  
  if (jsonlFiles.length > 0) {
    jsonlFiles.forEach(file => {
      dirs.forEach(dir => {
        const source = path.join(sourceDir, file);
        const destination = path.join(dir, file);
        
        if (fs.existsSync(source)) {
          fs.copyFileSync(source, destination);
          console.log(`Copied ${source} to ${destination}`);
        }
      });
    });
  }
}

// Add a timestamp to know when the server started
console.log(`[${new Date().toISOString()}] Starting production server...`);

// Log the directory structure to help with debugging
console.log('Current directory structure:');
try {
  const result = execSync('ls -la dist/ && ls -la data/').toString();
  console.log(result);
} catch (error) {
  console.log('Error listing directory structure:', error.message);
}

// Start the server in a child process
const nodeProcess = spawn('node', ['dist/index.js'], {
  env: { ...process.env, NODE_ENV: 'production' },
  stdio: 'inherit'
});

nodeProcess.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
  process.exit(code);
});

// Handle shutdown gracefully
process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down gracefully...');
  nodeProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down gracefully...');
  nodeProcess.kill('SIGTERM');
});