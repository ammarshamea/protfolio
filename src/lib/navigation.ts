export interface NavItem {
  key: string;
  href: string;
}

/** Primary header navigation — kept short on purpose; everything else lives in the footer, sitemap, and command palette. */
export const primaryNav: NavItem[] = [
  { key: "about", href: "/about" },
  { key: "projects", href: "/projects" },
  { key: "timeline", href: "/timeline" },
  { key: "techStack", href: "/tech-stack" },
  { key: "contact", href: "/contact" },
];

export const footerNavGroups: { titleKey: string; items: NavItem[] }[] = [
  {
    titleKey: "work",
    items: [
      { key: "projects", href: "/projects" },
      { key: "experience", href: "/experience" },
      { key: "services", href: "/services" },
      { key: "openSource", href: "/open-source" },
      { key: "skills", href: "/skills" },
      { key: "techStack", href: "/tech-stack" },
    ],
  },
  {
    titleKey: "about",
    items: [
      { key: "about", href: "/about" },
      { key: "timeline", href: "/timeline" },
      { key: "now", href: "/now" },
      { key: "uses", href: "/uses" },
      { key: "setup", href: "/uses/setup" },
      { key: "roadmap", href: "/roadmap" },
      { key: "stats", href: "/stats" },
    ],
  },
  {
    titleKey: "extras",
    items: [
      { key: "playground", href: "/playground" },
      { key: "lab", href: "/lab" },
      { key: "favorites", href: "/favorites" },
      { key: "toolbox", href: "/toolbox" },
      { key: "reading", href: "/reading" },
      { key: "blog", href: "/blog" },
      { key: "changelog", href: "/changelog" },
    ],
  },
  {
    titleKey: "connect",
    items: [
      { key: "contact", href: "/contact" },
      { key: "resume", href: "/resume" },
      { key: "speaking", href: "/speaking" },
      { key: "press", href: "/press" },
    ],
  },
];

export const allNavItems: NavItem[] = [
  { key: "home", href: "/" },
  ...footerNavGroups.flatMap((group) => group.items),
];
