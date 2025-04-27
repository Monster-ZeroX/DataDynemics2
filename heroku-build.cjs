#!/usr/bin/env node

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

  // Create necessary package.json for Heroku if it doesn't exist
  const herokuPackagePath = path.join(process.cwd(), 'package-heroku.json');
  if (fs.existsSync(herokuPackagePath)) {
    // Copy the Heroku package.json to the correct location
    const packageJsonContent = fs.readFileSync(herokuPackagePath, 'utf8');
    // Merge with existing package.json if needed
    const mainPackagePath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(mainPackagePath)) {
      try {
        const mainPackage = JSON.parse(fs.readFileSync(mainPackagePath, 'utf8'));
        const herokuPackage = JSON.parse(packageJsonContent);
        
        // Add Heroku specific scripts to the main package
        mainPackage.scripts = {
          ...mainPackage.scripts,
          ...herokuPackage.scripts
        };
        
        // Ensure the dependencies section includes Vite
        mainPackage.dependencies = {
          ...mainPackage.dependencies,
          ...herokuPackage.dependencies
        };
        
        // Add engines if they don't exist
        if (!mainPackage.engines) {
          mainPackage.engines = herokuPackage.engines;
        }
        
        // Write the merged package.json
        fs.writeFileSync(mainPackagePath, JSON.stringify(mainPackage, null, 2));
        console.log('Updated package.json with Heroku configuration');
      } catch (err) {
        console.error('Error merging package.json files:', err);
      }
    }
  }

  // Run the build
  console.log('Running build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Heroku build completed successfully');
} catch (error) {
  console.error('Error during Heroku build:', error);
  process.exit(1);
}