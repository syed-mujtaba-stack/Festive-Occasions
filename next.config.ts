import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Serve best-compression image formats first, smaller fallbacks after. */
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /* Hide the X-Powered-By header (tiny hardening, no perf cost). */
  poweredByHeader: false,
  /* 2026-09: "Christmas tree decoration" phrasing retired per client —
     tree service folded into the pillar; old URL redirects permanently. */
  async redirects() {
    return [
      {
        source: "/christmas-tree-decoration-dubai",
        destination: "/christmas-decoration-dubai",
        permanent: true,
      },
      {
        source: "/blog/christmas-tree-decoration-dubai-sizes-styles",
        destination: "/blog/christmas-decoration-dubai-sizes-styles",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;