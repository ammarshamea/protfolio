import Fuse from "fuse.js";

export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  group: "projects" | "pages" | "technologies";
}

export function createFuse(items: SearchItem[]) {
  return new Fuse(items, {
    keys: ["title", "subtitle"],
    threshold: 0.35,
  });
}
