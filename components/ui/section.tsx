import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: ReactNode;
  as?: ElementType;
}) {
  return <Tag className={cn("container-site", className)}>{children}</Tag>;
}

export function Section({
  id,
  className,
  children,
  tone = "light",
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "light" | "cream" | "dark";
}) {
  const tones = {
    light: "bg-background text-foreground",
    cream: "bg-cream text-foreground",
    dark: "bg-night text-ivory",
  } as const;

  return (
    <section id={id} className={cn("section-shell", tones[tone], className)}>
      {children}
    </section>
  );
}