import { z } from "zod";

export const timelineItemSchema = z.object({
  year: z.string(),
  title: z.string(),
  description: z.string(),
  highlights: z.array(z.string()).default([]),
});
export type TimelineItem = z.infer<typeof timelineItemSchema>;

export const roadmapGoalSchema = z.object({
  label: z.string(),
  done: z.boolean(),
});
export const roadmapYearSchema = z.object({
  year: z.string(),
  goals: z.array(roadmapGoalSchema),
});
export type RoadmapYear = z.infer<typeof roadmapYearSchema>;

export const nowItemSchema = z.object({
  label: z.string(),
  detail: z.string().optional(),
});
export const nowContentSchema = z.object({
  heroStatus: z.string(),
  updatedAt: z.string(),
  items: z.array(nowItemSchema),
});
export type NowContent = z.infer<typeof nowContentSchema>;

export const readingItemSchema = z.object({
  title: z.string(),
  author: z.string(),
  status: z.enum(["reading", "completed", "queued"]),
  note: z.string().optional(),
});
export type ReadingItem = z.infer<typeof readingItemSchema>;

export const playgroundItemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(["flutter", "css", "ai", "component"]),
  stack: z.array(z.string()).default([]),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
});
export type PlaygroundItem = z.infer<typeof playgroundItemSchema>;

export const labItemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(["idea", "prototyping", "paused"]),
  startedAt: z.string(),
});
export type LabItem = z.infer<typeof labItemSchema>;

export const favoriteItemSchema = z.object({
  category: z.enum(["tool", "book", "youtube", "podcast", "website"]),
  name: z.string(),
  description: z.string(),
  url: z.string().url().optional(),
});
export type FavoriteItem = z.infer<typeof favoriteItemSchema>;

export const toolboxItemSchema = z.object({
  category: z.enum([
    "ide",
    "design",
    "terminal",
    "api",
    "deployment",
    "productivity",
  ]),
  name: z.string(),
  description: z.string(),
  url: z.string().url().optional(),
});
export type ToolboxItem = z.infer<typeof toolboxItemSchema>;

export const usesItemSchema = z.object({
  category: z.string(),
  name: z.string(),
  description: z.string(),
});
export type UsesItem = z.infer<typeof usesItemSchema>;

export const setupItemSchema = z.object({
  category: z.enum([
    "device",
    "monitor",
    "keyboard",
    "mouse",
    "microphone",
    "camera",
    "extension",
  ]),
  name: z.string(),
  description: z.string(),
});
export type SetupItem = z.infer<typeof setupItemSchema>;

export const speakingItemSchema = z.object({
  title: z.string(),
  event: z.string(),
  date: z.string(),
  url: z.string().url().optional(),
});
export type SpeakingItem = z.infer<typeof speakingItemSchema>;

export const pressItemSchema = z.object({
  outlet: z.string(),
  title: z.string(),
  url: z.string().url(),
  date: z.string(),
});
export type PressItem = z.infer<typeof pressItemSchema>;

export const changelogEntrySchema = z.object({
  version: z.string(),
  date: z.string(),
  changes: z.array(z.string()),
});
export type ChangelogEntry = z.infer<typeof changelogEntrySchema>;

export const serviceItemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  deliverables: z.array(z.string()).default([]),
});
export type ServiceItem = z.infer<typeof serviceItemSchema>;

export const experienceItemSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  year: z.string(),
  responsibilities: z.array(z.string()),
  technologies: z.array(z.string()),
  achievements: z.array(z.string()),
});
export type ExperienceItem = z.infer<typeof experienceItemSchema>;

export const statsSchema = z.object({
  clientsServed: z.number(),
  yearsExperience: z.string(),
});
export type StatsContent = z.infer<typeof statsSchema>;
