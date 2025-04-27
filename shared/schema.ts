// Define the Student interface that matches the JSONL structure
export interface Student {
  "Index Number": string;
  "Name": string;
  "Z-Score": string;
  "District Rank": string;
  "Island Rank": string;
  "NIC Number": string;
  "Subjects": Record<string, string>;
}

// Keep the existing users table for the base template
import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
