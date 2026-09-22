import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Serve best-compression image formats first, smaller fallbacks after. */
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /* Hide the X-Powered-By header (tiny hardening, no perf cost). */
  poweredByHeader: false,
};

export default nextConfig;