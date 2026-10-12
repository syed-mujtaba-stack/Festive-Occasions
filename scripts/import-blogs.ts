/**
 * Import blog posts from JSON export to Sanity CMS
 * 
 * Run: npx tsx scripts/import-blogs.ts
 * 
 * This reads the blog-export.json file and imports all 12 posts
 * into Sanity with proper SEO structure.
 */

import { config } from "dotenv";
import { createClient } from "@sanity/client";
import blogData from "./blog-export.json";

config({ path: ".env.local" });

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

const client = createClient({
  apiVersion: "2026-10-12",
  projectId: requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: requireEnv("NEXT_PUBLIC_SANITY_DATASET"),
  token: requireEnv("SANITY_API_TOKEN"),
  useCdn: false,
});

type BlogSection =
  | { type: "p" | "h2" | "h3"; text: string }
  | { type: "ul"; items: string[] };

interface BlogPost {
  title: string;
  slug: string;
  category: string;
  published: string;
  readingMinutes: number;
  metaDescription: string;
  keywords: string[];
  heroImageKey: string;
  lead: string;
  sections: BlogSection[];
  faqs: Array<{ q: string; a: string }>;
  related: Array<{ label: string; href: string }>;
}

async function importBlogs() {
  const posts = blogData.posts as BlogPost[];
  const existing = await client.fetch<Array<{ _id: string; slug: string }>>(
    '*[_type == "post"]{_id, "slug": slug.current}'
  );
  const existingBySlug = new Map<string, string>();

  for (const document of existing) {
    if (!document.slug) continue;
    if (existingBySlug.has(document.slug)) {
      throw new Error(`Multiple Sanity documents use slug: ${document.slug}`);
    }
    existingBySlug.set(document.slug, document._id);
  }

  const documents = posts.map((post) => ({
    _id: existingBySlug.get(post.slug) ?? `post-${post.slug}`,
    _type: "post" as const,
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    category: post.category,
    publishedAt: new Date(`${post.published}T00:00:00.000Z`).toISOString(),
    readingMinutes: post.readingMinutes,
    metaDescription: post.metaDescription,
    keywords: post.keywords,
    heroImageKey: post.heroImageKey,
    lead: post.lead,
    sections: post.sections.map((section, index) => ({
      _key: `section-${index}`,
      _type: "blogSection",
      ...section,
    })),
    faqs: post.faqs.map((faq, index) => ({
      _key: `faq-${index}`,
      _type: "faqEntry",
      ...faq,
    })),
    related: post.related.map((link, index) => ({
      _key: `related-${index}`,
      _type: "relatedLink",
      ...link,
    })),
  }));

  const dryRun = process.argv.includes("--dry-run");
  const newCount = documents.filter(
    (document) => !existingBySlug.has(document.slug.current)
  ).length;
  const updateCount = documents.length - newCount;

  console.log(
    `Target: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}`
  );
  console.log(`Source posts: ${posts.length}; new: ${newCount}; matching slugs: ${updateCount}`);

  if (dryRun) {
    console.log("Dry run complete; no Sanity documents were changed.");
    return;
  }

  const transaction = client.transaction();
  for (const document of documents) {
    const { _id, _type, ...content } = document;
    if (existingBySlug.has(document.slug.current)) {
      transaction.patch(_id, { set: content });
    } else {
      transaction.create(document);
    }
  }

  await transaction.commit({ visibility: "sync" });

  const importedSlugs = await client.fetch<string[]>(
    '*[_type == "post" && slug.current in $slugs].slug.current',
    { slugs: posts.map((post) => post.slug) }
  );
  if (importedSlugs.length !== posts.length) {
    throw new Error(
      `Post-import validation failed: expected ${posts.length}, found ${importedSlugs.length}`
    );
  }

  console.log(`Import complete and verified: ${importedSlugs.length} posts.`);
}

importBlogs().catch((err) => {
  console.error("Import failed:", err.message);
  process.exit(1);
});