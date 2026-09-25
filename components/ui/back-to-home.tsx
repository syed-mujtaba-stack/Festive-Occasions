import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * BackToHome — small pill link used across page heroes so visitors can
 * return to the homepage from anywhere, without reaching for the nav.
 */
export function BackToHome({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-ivory/25 px-4 py-2 text-label text-ivory/80 transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-champagne hover:text-champagne",
        className
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
      >
        <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
      </svg>
      Back to Home
    </Link>
  );
}