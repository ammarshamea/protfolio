import { readLocaleJson } from "./fs-utils";
import { siteContentSchema, type SiteContent } from "@/lib/schemas/site";

export function getSiteContent(locale: string = "en"): SiteContent {
  const data = readLocaleJson<unknown>("site", locale);
  return siteContentSchema.parse(data);
}
