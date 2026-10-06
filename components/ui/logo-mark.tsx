"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/** LogoMark — the Festive Occasions logo using the actual logo.png file.
 * Uses next/image with priority for LCP optimization.
 * Mobile: smaller size, Desktop: moderate size.
 * Uses explicit width/height props — no parent positioning required.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative shrink-0 inline-block", className)}>
      <Image
        src="/images/logo.png"
        alt="Festive Occasions UAE"
        width={80}
        height={40}
        className="h-auto w-auto object-contain" />
    </span>
  );
}