import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { servicePages } from "@/lib/service-pages";
import { blogPosts } from "@/lib/blog";
import { images, type ImageKey } from "@/lib/images";
import { galleryProjects } from "@/lib/gallery";

/**
 * Static sitemap — every indexable route, with image entries so Google
 * Images can index the site's photos (client installations first).
 * Home = priority 1; pillar/contact = high; services = 0.8; supporting = 0.6.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const imgUrl = (key: ImageKey): string => `${base}${images[key].src}`;

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    images: ImageKey[];
  }[] = [
    {
      path: "/",
      priority: 1,
      changeFrequency: "weekly",
      images: ["hero"],
    },
    {
      path: "/contact",
      priority: 0.9,
      changeFrequency: "monthly",
      images: ["pageContact"],
    },
    {
      path: "/packages",
      priority: 0.8,
      changeFrequency: "monthly",
      images: ["hero"],
    },
    {
      path: "/blog",
      priority: 0.7,
      changeFrequency: "weekly",
      images: ["pageBlog"],
    },
    {
      path: "/gallery",
      priority: 0.7,
      changeFrequency: "monthly",
      images: ["hero", ...galleryProjects.map((p) => p.image)],
    },
    {
      path: "/areas-we-serve",
      priority: 0.6,
      changeFrequency: "monthly",
      images: ["pageAreas"],
    },
    {
      path: "/christmas-decoration-uae",
      priority: 0.7,
      changeFrequency: "monthly",
      images: ["pageUae"],
    },
    {
      path: "/about",
      priority: 0.6,
      changeFrequency: "monthly",
      images: ["pageAbout"],
    },
    {
      path: "/other-occasions",
      priority: 0.6,
      changeFrequency: "monthly",
      images: ["pageOther"],
    },
  ];

  const serviceRoutes = Object.values(servicePages).map((page) => ({
    path: `/${page.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    images: [page.heroImage] as ImageKey[],
  }));

  const blogRoutes = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
    images: [post.heroImage] as ImageKey[],
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes].map((route) => ({
    url: route.path === "/" ? base : `${base}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: route.images.map(imgUrl),
  }));
}