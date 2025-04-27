/**
 * Custom startup script for Heroku
 * This ensures we're using the correct environment setup for production
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure dist/data directory exists and has data files
try {
  // Create dirs if they don't exist
  const dirs = ['data', path.join('dist', 'data')];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });

  // Check if there are any JSONL files in the attached_assets directory
  const sourceDir = 'attached_assets';
  if (fs.existsSync(sourceDir)) {
    const jsonlFiles = fs.readdirSync(sourceDir).filter(file => file.endsWith('.jsonl'));
    
    if (jsonlFiles.length > 0) {
      // Copy JSONL files to data directories
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

  // Start the application
  console.log('Starting application in production mode...');
  execSync('NODE_ENV=production node dist/index.js', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' } 
  });
} catch (error) {
  console.error('Error during startup:', error);
  process.exit(1);
}