import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!api|og|icon$|icon\\.|apple-icon|icons/|feed\\.xml|feed|_next|_vercel|llms\\.txt|manifest\\.webmanifest|browserconfig\\.xml|sw\\.js|serwist|~offline|dashboard|admin|.*\\..*).*)",
  ],
};
