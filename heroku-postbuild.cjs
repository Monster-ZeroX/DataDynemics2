#!/usr/bin/env node

/**
 * This script runs after Heroku installs dependencies but before it builds the app
 * It ensures we have the right setup for the build process
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Running Heroku postbuild script...');

try {
  // Make sure the dev dependencies needed for the build are installed
  console.log('Installing required build dependencies...');
  const dependencies = [
    '@vitejs/plugin-react',
    'vite',
    'esbuild'
  ];
  
  for (const dep of dependencies) {
    if (!fs.existsSync(path.join('node_modules', dep))) {
      console.log(`Installing ${dep}...`);
      execSync(`npm install ${dep} --no-save`, { stdio: 'inherit' });
    }
  }
  
  // Copy data files
  console.log('Setting up data directories...');
  const dirs = ['data', path.join('dist', 'data')];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
  
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
  
  // Run the build
  console.log('Building the application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Heroku postbuild completed successfully');
} catch (error) {
  console.error('Error during Heroku postbuild:', error);
  process.exit(1);
}