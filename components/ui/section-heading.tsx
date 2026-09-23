import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow",
        tone === "dark" ? "text-champagne" : "text-champagne",
        className
      )}
    >
      <span
        aria-hidden
        className="h-px w-10 bg-champagne"
      />
      <span className={cn(tone === "dark" ? "text-warm-gray" : "text-warm-gray-deep")}>{children}</span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "text-h2",
          tone === "dark" ? "text-ivory" : "text-espresso"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-lead max-w-2xl",
            tone === "dark" ? "text-ivory/70" : "text-cocoa",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}