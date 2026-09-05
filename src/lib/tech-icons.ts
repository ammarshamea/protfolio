import type { ComponentType } from "react";
import { Layers, Sparkles, Terminal } from "lucide-react";
import { FaCss3Alt, FaWhatsapp } from "react-icons/fa";
import {
  SiAndroidstudio,
  SiDart,
  SiDocker,
  SiFigma,
  SiFlutter,
  SiGit,
  SiGooglemaps,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNotion,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export type TechIconComponent = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
}>;

function normalize(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const ICONS: Record<string, TechIconComponent> = {
  flutter: SiFlutter,
  bloc: SiFlutter,
  dart: SiDart,
  laravel: SiLaravel,
  sanctum: SiLaravel,
  nextjs: SiNextdotjs,
  next: SiNextdotjs,
  react: SiReact,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  docker: SiDocker,
  git: SiGit,
  redis: SiRedis,
  python: SiPython,
  typescript: SiTypescript,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  php: SiPhp,
  figma: SiFigma,
  gsap: SiGreensock,
  greensock: SiGreensock,
  googlemaps: SiGooglemaps,
  geolocation: SiGooglemaps,
  vite: SiVite,
  html: SiHtml5,
  html5: SiHtml5,
  css: FaCss3Alt,
  css3: FaCss3Alt,
  javascript: SiJavascript,
  js: SiJavascript,
  vercel: SiVercel,
  postman: SiPostman,
  vscode: VscVscode,
  visualstudiocode: VscVscode,
  androidstudio: SiAndroidstudio,
  windowsterminal: Terminal,
  notion: SiNotion,
  whatsapp: FaWhatsapp,
  whatsappapi: FaWhatsapp,
  ai: Sparkles,
  aiintegration: Sparkles,
};

export function resolveTechIcon(name: string): TechIconComponent {
  return ICONS[normalize(name)] ?? Layers;
}
