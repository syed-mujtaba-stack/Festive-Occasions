/**
 * Sanity Client — configured for the Festive Occasions blog migration.
 * 
 * Provides the server-side Sanity client and blog post queries.
 */

import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  apiVersion: "2026-10-12",
  // These env vars should be set in .env.local or the deployment environment
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Type definitions matching the Sanity post schema
export interface SanityPost {
  _id: string;
  _type: "post";
  title: string;
  slug: string;
  category: string;
  published: string;
  updated?: string;
  readingMinutes: number;
  metaDescription: string;
  keywords: string[] | null;
  heroImageKey: string | null;
  lead: string;
  sections: Array<
    | { type: "p" | "h2" | "h3"; text: string; items?: string[] }
    | { type: "ul"; text?: string; items: string[] }
  > | null;
  faqs: Array<{
    q: string;
    a: string;
  }> | null;
  related: Array<{
    label: string;
    href: string;
  }>;
  _createdAt?: string;
  _updatedAt?: string;
}

/**
 * Fetch a single blog post by slug from Sanity.
 * Returns null when no published Sanity post matches the requested slug.
 */
export async function getSanityPost(slug: string): Promise<SanityPost | null> {
  const query = `
      *[_type == "post" && slug.current == $slug] | order(publishedAt desc) {
        _id,
        _type,
        title,
        "slug": slug.current,
        category,
        "published": publishedAt,
        updated,
        readingMinutes,
        metaDescription,
        keywords[],
        heroImageKey,
        lead,
        sections[] {
          type,
          text,
          items[]
        },
        faqs[] {
          q,
          a
        },
        related[] {
          label,
          href
        }
      }
    `;

  const results = await sanityClient.fetch<SanityPost[]>(query, { slug });
  return results[0] ?? null;
}

/**
 * Fetch all blog posts from Sanity, ordered by published date (newest first).
 * Fetch all published blog posts from Sanity, ordered by published date.
 */
export async function getAllSanityPosts(): Promise<SanityPost[]> {
  const query = `
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        _type,
        title,
        "slug": slug.current,
        category,
        "published": publishedAt,
        updated,
        readingMinutes,
        metaDescription,
        keywords[],
        heroImageKey,
        lead,
        sections[] {
          type,
          text,
          items[]
        },
        faqs[] {
          q,
          a
        },
        related[] {
          label,
          href
        }
      }
    `;

  return sanityClient.fetch<SanityPost[]>(query);
}

export async function getSanityPostSlugs(): Promise<string[]> {
  return sanityClient.fetch<string[]>(
    '*[_type == "post" && defined(slug.current)] | order(publishedAt desc).slug.current'
  );
}

/**
 * GROQ query helper for the blog index page - gets post summaries
 */
export async function getBlogPostSummaries(): Promise<Array<{
  slug: string;
  title: string;
  category: string;
  published: string;
  updated?: string;
  readingMinutes: number;
  metaDescription: string;
  heroImageKey: string | null;
}>> {
  const query = `
      *[_type == "post"] | order(publishedAt desc) {
        "slug": slug.current,
        title,
        category,
        "published": publishedAt,
        updated,
        readingMinutes,
        metaDescription,
        heroImageKey
      }
    `;

  return sanityClient.fetch(query);
}