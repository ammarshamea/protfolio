interface OpenApiOperation {
  summary: string;
  description: string;
  responses: Record<string, { description: string; content?: unknown }>;
  requestBody?: unknown;
}

export interface OpenApiSpec {
  openapi: string;
  info: { title: string; description: string; version: string };
  servers: { url: string }[];
  paths: Record<string, Record<string, OpenApiOperation>>;
}

/** Single source of truth for the routes documented at /api/docs and /api-docs. */
export function getOpenApiSpec(): OpenApiSpec {
  return {
    openapi: "3.0.3",
    info: {
      title: "Ammar Shamea — Portfolio API",
      description:
        "Public API routes backing this portfolio. No authentication required.",
      version: "1.0.0",
    },
    servers: [{ url: "/api" }],
    paths: {
      "/contact": {
        post: {
          summary: "Submit the contact form",
          description:
            "Rate-limited (1 request per minute per IP). Sends an email via Resend when configured.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "subject", "message"],
                  properties: {
                    name: { type: "string" },
                    email: { type: "string", format: "email" },
                    subject: { type: "string" },
                    message: { type: "string" },
                    company: {
                      type: "string",
                      description: "Honeypot field — leave empty.",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Message sent or logged." },
            "400": { description: "Invalid form submission." },
            "429": { description: "Rate limited." },
            "502": { description: "Email provider error." },
          },
        },
      },
      "/analytics": {
        post: {
          summary: "Record a first-party analytics event",
          description:
            "Fire-and-forget event tracking for page views, project views, resume downloads, CTA clicks, and search queries. No cookies, no third-party trackers, no visitor PII stored.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["type"],
                  properties: {
                    type: {
                      type: "string",
                      enum: [
                        "page_view",
                        "project_view",
                        "resume_download",
                        "cta_click",
                        "search_query",
                      ],
                    },
                    path: { type: "string" },
                    label: { type: "string" },
                    locale: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "204": { description: "Event recorded." },
            "400": { description: "Invalid event payload." },
            "429": { description: "Rate limited." },
          },
        },
      },
      "/github": {
        get: {
          summary: "Fetch curated GitHub profile data",
          description:
            "Returns pinned/top repositories, languages, recent public activity, and follower count. Deliberately excludes commit, issue, and PR counts. Cached for one hour.",
          responses: {
            "200": {
              description: "GitHub profile summary.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      followers: { type: "integer" },
                      pinnedRepos: { type: "array", items: { type: "object" } },
                      recentActivity: {
                        type: "array",
                        items: { type: "object" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}
