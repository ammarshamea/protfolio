import { z } from "zod";

export const siteContentSchema = z.object({
  name: z.string(),
  titles: z.array(z.string()),
  tagline: z.string(),
  motto: z.string(),
  location: z.string(),
  bio: z.object({
    short: z.string(),
    long: z.array(z.string()),
  }),
  mission: z.string(),
  vision: z.string(),
  values: z.array(z.object({ title: z.string(), description: z.string() })),
  philosophy: z.string(),
  howIWork: z.object({
    intro: z.string(),
    steps: z.array(z.object({ title: z.string(), description: z.string() })),
  }),
  funFacts: z.array(z.string()),
  contact: z.object({
    email: z.string().email(),
    whatsapp: z.string(),
    location: z.string(),
    timezone: z.string(),
    responseTime: z.string(),
    availability: z.array(z.string()),
    languages: z.array(z.object({ name: z.string(), level: z.string() })),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })),
  }),
  socials: z.object({
    github: z.string().url(),
    codeberg: z.string().url(),
    linkedin: z.string().url(),
    whatsapp: z.string().url(),
    email: z.string(),
  }),
});

export type SiteContent = z.infer<typeof siteContentSchema>;
