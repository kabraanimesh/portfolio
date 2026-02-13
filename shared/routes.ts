import { z } from 'zod';
import { 
  insertProfileSchema, 
  insertSkillSchema, 
  insertExperienceSchema, 
  insertProjectSchema, 
  insertMessageSchema,
  profile,
  skills,
  experience,
  projects,
  messages
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  profile: {
    get: {
      method: 'GET' as const,
      path: '/api/profile' as const,
      responses: {
        200: z.custom<typeof profile.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: 'POST' as const,
      path: '/api/profile' as const,
      input: insertProfileSchema,
      responses: {
        200: z.custom<typeof profile.$inferSelect>(),
      },
    },
  },
  skills: {
    list: {
      method: 'GET' as const,
      path: '/api/skills' as const,
      responses: {
        200: z.array(z.custom<typeof skills.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/skills' as const,
      input: insertSkillSchema,
      responses: {
        201: z.custom<typeof skills.$inferSelect>(),
      },
    },
  },
  experience: {
    list: {
      method: 'GET' as const,
      path: '/api/experience' as const,
      responses: {
        200: z.array(z.custom<typeof experience.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/experience' as const,
      input: insertExperienceSchema,
      responses: {
        201: z.custom<typeof experience.$inferSelect>(),
      },
    },
  },
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects' as const,
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/projects' as const,
      input: insertProjectSchema,
      responses: {
        201: z.custom<typeof projects.$inferSelect>(),
      },
    },
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertMessageSchema,
      responses: {
        201: z.custom<typeof messages.$inferSelect>(),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
