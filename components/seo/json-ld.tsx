/**
 * JsonLd — renders schema.org structured data as a script tag.
 * Values are escaped to prevent XSS via JSON payloads (per Next.js
 * documentation). Use only client-verified data (docs/seo/schema-plan.md).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}