/**
 * This script is used to build the application specifically for Heroku deployment.
 * It ensures that all necessary dependencies are available in production.
 */

console.log('Building for Heroku deployment...');

// Import required modules
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  // Create data directories if they don't exist
  const dataDirs = ['data', path.join('dist', 'data')];
  dataDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });

  // Copy JSONL data files
  const sourceDir = path.join('attached_assets');
  if (fs.existsSync(sourceDir)) {
    const jsonlFiles = fs.readdirSync(sourceDir).filter(file => file.endsWith('.jsonl'));
    
    jsonlFiles.forEach(file => {
      dataDirs.forEach(dir => {
        const source = path.join(sourceDir, file);
        const destination = path.join(dir, file);
        fs.copyFileSync(source, destination);
        console.log(`Copied ${source} to ${destination}`);
      });
    });
  } else {
    console.warn(`Warning: Source directory ${sourceDir} not found`);
  }

  // Run the build
  console.log('Running build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Heroku build completed successfully');
} catch (error) {
  console.error('Error during Heroku build:', error);
  process.exit(1);
}