"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * LogoMark — the Festive Occasions logo using the actual logo.png file.
 * Uses next/image with priority for LCP optimization.
 * Mobile: 140px, Desktop: 180px. Height auto.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative shrink-0", className)}>
      <Image
        src="/logo.png"
        alt="Festive Occasions UAE"
        width={180}
        height={180}
        priority
        className="h-[140px] w-auto md:h-[180px] md:w-auto"
        sizes="(max-width: 768px) 140px, 180px"
      />
    </span>
  );
}