import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * robots.txt — authored for the production domain (festiveoccasions.ae).
 * Everything is public: allow all crawlers, expose the XML sitemap (which
 * itself embeds 33 image entries for Google Images). No admin/dev paths to
 * block — there are none on this static site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
      },
      {
        userAgent: "Yandex",
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}