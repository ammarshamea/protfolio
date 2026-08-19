import { readLocaleJson, readJsonFile } from "./fs-utils";
import {
  timelineItemSchema,
  roadmapYearSchema,
  nowContentSchema,
  readingItemSchema,
  playgroundItemSchema,
  labItemSchema,
  favoriteItemSchema,
  toolboxItemSchema,
  usesItemSchema,
  setupItemSchema,
  speakingItemSchema,
  pressItemSchema,
  changelogEntrySchema,
  serviceItemSchema,
  experienceItemSchema,
  statsSchema,
} from "@/lib/schemas/misc";
import { z } from "zod";

export function getTimeline(locale: string = "en") {
  const data = readLocaleJson<unknown[]>("timeline", locale) ?? [];
  return z.array(timelineItemSchema).parse(data);
}

export function getRoadmap(locale: string = "en") {
  const data = readLocaleJson<unknown[]>("roadmap", locale) ?? [];
  return z.array(roadmapYearSchema).parse(data);
}

export function getNow(locale: string = "en") {
  const data = readLocaleJson<unknown>("now", locale);
  return nowContentSchema.parse(data);
}

export function getReading(locale: string = "en") {
  const data = readLocaleJson<unknown[]>("reading", locale) ?? [];
  return z.array(readingItemSchema).parse(data);
}

export function getPlayground(locale: string = "en") {
  const data = readLocaleJson<unknown[]>("playground", locale) ?? [];
  return z.array(playgroundItemSchema).parse(data);
}

export function getLab(locale: string = "en") {
  const data = readLocaleJson<unknown[]>("lab", locale) ?? [];
  return z.array(labItemSchema).parse(data);
}

export function getFavorites(locale: string = "en") {
  const data = readLocaleJson<unknown[]>("favorites", locale) ?? [];
  return z.array(favoriteItemSchema).parse(data);
}

export function getToolbox(locale: string = "en") {
  const data = readLocaleJson<unknown[]>("toolbox", locale) ?? [];
  return z.array(toolboxItemSchema).parse(data);
}

export function getUses(locale: string = "en") {
  const data = readLocaleJson<unknown[]>("uses", locale) ?? [];
  return z.array(usesItemSchema).parse(data);
}

export function getSetup(locale: string = "en") {
  const data = readLocaleJson<unknown[]>("setup", locale) ?? [];
  return z.array(setupItemSchema).parse(data);
}

export function getSpeaking(locale: string = "en") {
  const data = readLocaleJson<unknown[]>("speaking", locale) ?? [];
  return z.array(speakingItemSchema).parse(data);
}

export function getPress(locale: string = "en") {
  const data = readLocaleJson<unknown[]>("press", locale) ?? [];
  return z.array(pressItemSchema).parse(data);
}

export function getChangelog(locale: string = "en") {
  const data = readLocaleJson<unknown[]>("changelog", locale) ?? [];
  return z.array(changelogEntrySchema).parse(data);
}

export function getServices(locale: string = "en") {
  const data = readLocaleJson<unknown[]>("services", locale) ?? [];
  return z.array(serviceItemSchema).parse(data);
}

export function getExperience(locale: string = "en") {
  const data = readLocaleJson<unknown[]>("experience", locale) ?? [];
  return z.array(experienceItemSchema).parse(data);
}

export function getStats() {
  const data = readJsonFile<unknown>("stats.en.json");
  return statsSchema.parse(data);
}
