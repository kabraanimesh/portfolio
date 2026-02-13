import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertMessage } from "@shared/routes";

// ============================================
// PROFILE HOOKS
// ============================================
export function useProfile() {
  return useQuery({
    queryKey: [api.profile.get.path],
    queryFn: async () => {
      const res = await fetch(api.profile.get.path);
      if (res.status === 404) return null; // Handle 404 gracefully
      if (!res.ok) throw new Error('Failed to fetch profile');
      return api.profile.get.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// SKILLS HOOKS
// ============================================
export function useSkills() {
  return useQuery({
    queryKey: [api.skills.list.path],
    queryFn: async () => {
      const res = await fetch(api.skills.list.path);
      if (!res.ok) throw new Error('Failed to fetch skills');
      return api.skills.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// EXPERIENCE HOOKS
// ============================================
export function useExperience() {
  return useQuery({
    queryKey: [api.experience.list.path],
    queryFn: async () => {
      const res = await fetch(api.experience.list.path);
      if (!res.ok) throw new Error('Failed to fetch experience');
      return api.experience.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// PROJECTS HOOKS
// ============================================
export function useProjects() {
  return useQuery({
    queryKey: [api.projects.list.path],
    queryFn: async () => {
      const res = await fetch(api.projects.list.path);
      if (!res.ok) throw new Error('Failed to fetch projects');
      return api.projects.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// CONTACT HOOKS
// ============================================
export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const validated = api.contact.submit.input.parse(data);
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });
      if (!res.ok) throw new Error('Failed to send message');
      return api.contact.submit.responses[201].parse(await res.json());
    },
    // No need to invalidate queries as messages are write-only for the public side
  });
}
