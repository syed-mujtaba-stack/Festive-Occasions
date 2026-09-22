import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

/**
 * PageBreadcrumbSchema — honest BreadcrumbList for top-level pages
 * (Home → page). Navigation structure only; no invented claims.
 * Matches the visible breadcrumb/link context on each page.
 */
export function PageBreadcrumbSchema({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name, item: `${siteConfig.url}${path}` },
        ],
      }}
    />
  );
}