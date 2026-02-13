import { pgTable, text, serial, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Profile Information
export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  location: text("location").notNull(),
  email: text("email").notNull(),
  linkedin: text("linkedin"),
  resumeUrl: text("resume_url"),
});

// Technical Skills
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // Frontend, Backend, Cloud, etc.
  name: text("name").notNull(),
  proficiency: integer("proficiency").default(100), // 0-100
});

// Professional Experience
export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  period: text("period").notNull(), // e.g. "April 2025 - Present"
  description: text("description").notNull(),
  achievements: text("achievements").array(),
  order: integer("order").notNull().default(0),
});

// Projects / Achievements
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies").array(),
  impact: text("impact"),
  link: text("link"),
  imageUrl: text("image_url"),
});

// Contact Messages
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod Schemas
export const insertProfileSchema = createInsertSchema(profile).omit({ id: true });
export const insertSkillSchema = createInsertSchema(skills).omit({ id: true });
export const insertExperienceSchema = createInsertSchema(experience).omit({ id: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });

// Types
export type Profile = typeof profile.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Experience = typeof experience.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Message = typeof messages.$inferSelect;

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

import { integer } from "drizzle-orm/pg-core";
