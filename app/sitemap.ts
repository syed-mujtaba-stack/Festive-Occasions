import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://festiveoccasions.ae";

  const routes = [
    "/",
    "/christmas-decoration-dubai",
    "/christmas-villa-decoration-dubai",
    "/christmas-home-decoration-dubai",
    "/christmas-office-decoration-dubai",
    "/christmas-corporate-decoration-dubai",
    "/christmas-lighting-dubai",
    "/outdoor-christmas-decoration-dubai",
    "/packages",
    "/gallery",
    "/blog",
    "/about",
    "/contact",
    "/other-occasions",
  ];

  // Build full URLs with base
  return routes.map((route) => ({
    url: baseUrl + route,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
}