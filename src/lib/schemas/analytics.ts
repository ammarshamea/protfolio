import { z } from "zod";

export const analyticsEventSchema = z.object({
  type: z.enum([
    "page_view",
    "project_view",
    "resume_download",
    "cta_click",
    "search_query",
  ]),
  path: z.string().max(300).optional(),
  label: z.string().max(200).optional(),
  locale: z.string().max(10).optional(),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;
