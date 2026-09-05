import { z } from "zod";

export const projectCategorySchema = z.enum([
  "saas",
  "mobile",
  "web",
  "automation",
  "agency",
  "package",
]);

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  category: projectCategorySchema,
  featured: z.boolean().default(false),
  favorite: z.boolean().default(false),
  role: z.string(),
  duration: z.string(),
  year: z.string(),
  overview: z.string(),
  problem: z.string(),
  solution: z.string(),
  architecture: z.string(),
  features: z.array(z.string()).default([]),
  challenges: z.array(z.string()).default([]),
  lessonsLearned: z.array(z.string()).default([]),
  futureImprovements: z.array(z.string()).default([]),
  results: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([]),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  coverImage: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  screenshotPending: z.boolean().default(false),
  /**
   * `showcase` = case-study cards and headline metrics.
   * `open-source` = packages / tiny libs listed on /open-source, not counted
   * as shipped products.
   */
  listing: z.enum(["showcase", "open-source"]).default("showcase"),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectCategory = z.infer<typeof projectCategorySchema>;
