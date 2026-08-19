import { z } from "zod";

export const technologySchema = z.object({
  slug: z.string(),
  name: z.string(),
  category: z.enum([
    "mobile",
    "backend",
    "frontend",
    "database",
    "devops",
    "design",
    "ai",
    "architecture",
  ]),
  yearsOfExperience: z.number(),
  proficiency: z.number().min(1).max(5),
  experience: z.string(),
  whyChosen: z.string(),
  alternatives: z.array(z.string()).default([]),
  projectSlugs: z.array(z.string()).default([]),
});

export type Technology = z.infer<typeof technologySchema>;
