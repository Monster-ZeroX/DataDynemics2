import { students, type Student } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  getStudent(indexNumber: string): Promise<Student | undefined>;
  searchStudents(query: string): Student[];
  addStudent(student: Student): Promise<Student>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private students: Map<string, Student>;
  
  constructor() {
    this.students = new Map();
  }
  
  async getStudent(indexNumber: string): Promise<Student | undefined> {
    return this.students.get(indexNumber);
  }
  
  searchStudents(query: string): Student[] {
    if (!query) return [];
    
    const normalizedQuery = query.toLowerCase();
    const results: Student[] = [];
    
    for (const student of this.students.values()) {
      if (student.Name.toLowerCase().includes(normalizedQuery)) {
        results.push(student);
        
        // Limit results to 20 for performance
        if (results.length >= 20) {
          break;
        }
      }
    }
    
    return results;
  }
  
  async addStudent(student: Student): Promise<Student> {
    this.students.set(student["Index Number"], student);
    return student;
  }
}

// Create and export a single instance
export const storage = new MemStorage();
