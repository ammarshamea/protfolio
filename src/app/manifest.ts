import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ammar Shamea — Flutter & Full Stack Developer",
    short_name: "Ammar Shamea",
    description:
      "Flutter and full-stack engineer building production mobile apps and web platforms.",
    start_url: "/en",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#4F46E5",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/icons/icon-192", sizes: "192x192", type: "image/png" },
      {
        src: "/icons/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
