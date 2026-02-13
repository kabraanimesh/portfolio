import { db } from "./db";
import { 
  profile, skills, experience, projects, messages,
  type Profile, type Skill, type Experience, type Project, type Message,
  type InsertProfile, type InsertSkill, type InsertExperience, type InsertProject, type InsertMessage
} from "@shared/schema";
import { eq, asc } from "drizzle-orm";

export interface IStorage {
  // Profile
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: number, profile: InsertProfile): Promise<Profile>;

  // Skills
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;

  // Experience
  getExperience(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;

  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;

  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  // Profile
  async getProfile(): Promise<Profile | undefined> {
    const result = await db.select().from(profile).limit(1);
    return result[0];
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const [newProfile] = await db.insert(profile).values(insertProfile).returning();
    return newProfile;
  }

  async updateProfile(id: number, insertProfile: InsertProfile): Promise<Profile> {
    const [updatedProfile] = await db
      .update(profile)
      .set(insertProfile)
      .where(eq(profile.id, id))
      .returning();
    return updatedProfile;
  }

  // Skills
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(insertSkill).returning();
    return newSkill;
  }

  // Experience
  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience).orderBy(asc(experience.order));
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const [newExperience] = await db.insert(experience).values(insertExperience).returning();
    return newExperience;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(insertProject).returning();
    return newProject;
  }

  // Messages
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(insertMessage).returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();
