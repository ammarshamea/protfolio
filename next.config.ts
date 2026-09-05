import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createBundleAnalyzer from "@next/bundle-analyzer";
import { withSerwist } from "@serwist/turbopack";
import { withSentryConfig } from "@sentry/nextjs";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.trycloudflare.com"],
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath: "/protfolio",
        assetPrefix: "/protfolio",
        trailingSlash: true,
        images: {
          loader: "custom" as const,
          loaderFile: "./src/lib/image-loader.ts",
        },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
        },
      }),
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "react-icons",
      "recharts",
    ],
    inlineCss: true,
  },
  ...(!isGithubPages
    ? {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                {
                  key: "X-Content-Type-Options",
                  value: "nosniff",
                },
                {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
                },
              ],
            },
          ];
        },
      }
    : {}),
};

const withIntl = withNextIntl(nextConfig);

const config = isGithubPages
  ? withIntl
  : withSentryConfig(withSerwist(withBundleAnalyzer(withIntl)), {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: !process.env.CI,
      widenClientFileUpload: true,
    });

export default config;
