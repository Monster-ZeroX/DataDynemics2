import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from "fs";
import path from "path";
import readline from "readline";
import { storage } from "./storage";
import { log } from "./vite";

// Define the Student type
interface Student {
  "Index Number": string;
  "Name": string;
  "Z-Score": string;
  "District Rank": string;
  "Island Rank": string;
  "NIC Number": string;
  "Subjects": Record<string, string>;
}

async function loadJsonlFiles() {
  // Try to load from multiple possible locations for flexibility
  const possibleDataDirs = [
    path.join(process.cwd(), "attached_assets"),
    path.join(process.cwd(), "data"),
    path.join(process.cwd(), "dist", "data")
  ];
  
  let students: Student[] = [];
  
  for (const dataDir of possibleDataDirs) {
    try {
      // Check if the data directory exists
      if (!fs.existsSync(dataDir)) {
        log(`Data directory not found: ${dataDir}`, "warning");
        continue;
      }
      
      // Get all JSONL files in the directory
      const files = fs.readdirSync(dataDir).filter(file => file.endsWith(".jsonl"));
      
      if (files.length === 0) {
        log(`No JSONL files found in ${dataDir}`, "warning");
        continue;
      }
      
      // Process each JSONL file
      for (const file of files) {
        const filePath = path.join(dataDir, file);
        log(`Loading data from ${filePath}`);
        
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });
        
        for await (const line of rl) {
          try {
            if (line.trim()) {
              const student = JSON.parse(line);
              students.push(student);
            }
          } catch (err) {
            log(`Error parsing line in ${file}: ${err}`, "error");
          }
        }
      }
      
      // If we've successfully loaded data, no need to check other directories
      if (students.length > 0) {
        break;
      }
    } catch (error) {
      log(`Error loading JSONL files from ${dataDir}: ${error}`, "error");
    }
  }
  
  if (students.length === 0) {
    log("Could not load any student data from any location", "error");
  } else {
    log(`Loaded ${students.length} student records`);
  }
  
  return students;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Load all student data at startup
  const students = await loadJsonlFiles();
  
  // Store the loaded data in memory
  for (const student of students) {
    await storage.addStudent(student);
  }
  
  // API routes
  app.get('/api/search', (req, res) => {
    const query = req.query.q as string || '';
    
    if (!query) {
      return res.json([]);
    }
    
    try {
      const results = storage.searchStudents(query);
      return res.json(results);
    } catch (error) {
      log(`Search error: ${error}`, "error");
      return res.status(500).json({ error: 'An error occurred during search' });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
