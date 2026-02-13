import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // Profile
  app.get(api.profile.get.path, async (req, res) => {
    const profile = await storage.getProfile();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  });

  app.post(api.profile.update.path, async (req, res) => {
    try {
      const input = api.profile.update.input.parse(req.body);
      // Assuming single profile for now, update if exists or create
      const existing = await storage.getProfile();
      let profile;
      if (existing) {
        profile = await storage.updateProfile(existing.id, input);
      } else {
        profile = await storage.createProfile(input);
      }
      res.json(profile);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.post(api.skills.create.path, async (req, res) => {
    try {
      const input = api.skills.create.input.parse(req.body);
      const skill = await storage.createSkill(input);
      res.status(201).json(skill);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  // Experience
  app.get(api.experience.list.path, async (req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

  app.post(api.experience.create.path, async (req, res) => {
    try {
      const input = api.experience.create.input.parse(req.body);
      const exp = await storage.createExperience(input);
      res.status(201).json(exp);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post(api.projects.create.path, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  await seedDatabase();

  return httpServer;
}

// Seed function
export async function seedDatabase() {
  const existingProfile = await storage.getProfile();
  if (!existingProfile) {
    await storage.createProfile({
      name: "Animesh Kabra",
      title:
        "Senior Engineering Manager at TurboHire | Full-Stack Development Expert",
      summary:
        "Passionate problem-solver with nearly 6 years of full-stack development experience. Strong expertise in ReactJS and C#, with proven ability to deliver high-quality solutions while continuously learning and improving. Committed to taking ownership of impactful projects and balancing efficiency with innovation to achieve success.",
      location: "Hyderabad, Telangana, India",
      email: "kabraanimesh@gmail.com", // Placeholder
      linkedin: "https://www.linkedin.com/in/animesh-kabra-bab06b10a/", // Placeholder
      resumeUrl: "/assets/resume.pdf",
    });

    const skillsData = [
      { category: "Frontend", name: "ReactJS" },
      { category: "Frontend", name: "AngularJS" },
      { category: "Frontend", name: "Modern UI/UX" },
      { category: "Backend", name: "C#" },
      { category: "Backend", name: ".NET" },
      { category: "Backend", name: "Python" },
      { category: "Backend", name: "Scalable API Development" },
      { category: "Cloud", name: "GCP" },
      { category: "Cloud", name: "Azure" },
      { category: "Cloud", name: "High-availability deployments" },
      { category: "Data", name: "MySQL" },
      { category: "Data", name: "SQL Optimization" },
      { category: "Data", name: "Data Architecture" },
    ];

    for (const skill of skillsData) {
      await storage.createSkill(skill);
    }

    const experienceData = [
      {
        company: "TurboHire",
        role: "Senior Engineering Manager",
        period: "April 2025 - Present",
        description:
          "Leading end-to-end technology strategy, architecture, and delivery for TurboHire's core platform systems across GCP and Azure.",
        achievements: [
          "Building scalable, secure, fault-tolerant architectures",
          "Driving platform modernization",
          "Oversee technical design reviews",
          "Mentor engineering leads",
        ],
        order: 1,
      },
      {
        company: "TurboHire",
        role: "Senior Software Engineer",
        period: "April 2023 - March 2025",
        description:
          "Designed, developed, and scaled core platform capabilities using C#, .NET, React, and MySQL.",
        achievements: [
          "Led end-to-end development of critical modules",
          "Architected next-generation IAM solution using Duende IdentityServer",
          "Delivered 30+ external application integrations",
        ],
        order: 2,
      },
      {
        company: "TurboHire",
        role: "Software Engineer 2",
        period: "2021 - 2023",
        description: "Software Engineer 2 at TurboHire",
        achievements: [],
        order: 3,
      },
      {
        company: "Capgemini",
        role: "Software Engineer",
        period: "2019 - 2021",
        description: "Software Engineer at Capgemini",
        achievements: [],
        order: 4,
      },
    ];

    for (const exp of experienceData) {
      await storage.createExperience(exp);
    }

    const projectsData = [
      {
        title: "IAM with Duende IdentityServer",
        description:
          "Architected next-generation IAM solution significantly improving platform security and authentication flows.",
        technologies: ["Duende IdentityServer", ".NET", "Security"],
        impact:
          "Enhanced security and system independence. Decoupled from legacy components.",
      },
      {
        title: "Platform Integration System",
        description:
          "Delivered 30+ external application integrations via REST APIs.",
        technologies: ["REST API", "Integration", "C#"],
        impact: "Connected external ecosystem.",
      },
    ];

    for (const proj of projectsData) {
      await storage.createProject(proj);
    }
  }
}
