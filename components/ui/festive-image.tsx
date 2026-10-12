import Image from "next/image";
import { cn } from "@/lib/utils";
import { images, type ImageEntry, type ImageKey } from "@/lib/images";

/**
 * FestiveImage — ready-to-swap image slot.
 * Uses next/image (optimized, responsive, lazy) with object-cover.
 * Swap the manifest entry in lib/images.ts to use real client photos.
 */
export function FestiveImage({
  image,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  fill = true,
  fit,
  fallbackKey,
}: {
  image: ImageKey | { src: string; alt: string };
  alt?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  /** `contain` letterboxes the whole photo — required wherever the image
   *  must be seen uncropped (lightbox / full project view, or a photo that
   *  cannot fill its frame). Overrides the `fit` pinned in lib/images.ts. */
  fit?: "cover" | "contain";
  /** Fallback image key if the provided key is not found in the manifest */
  fallbackKey?: ImageKey;
}) {
  // Default fallbackKey to "hero" if not provided
  const fallbackKeyValue = fallbackKey || "hero";
  // Resolve the image from the manifest, with fallbacks
  const resolved = (
    typeof image === "string"
      ? images[image] || images[fallbackKeyValue] || images["hero"]
      : image
  ) as ImageEntry | undefined;
  // If still undefined after fallback, use hero image as last resort
  const safeResolved = resolved || images.hero;
  const altText = alt ?? safeResolved.alt;

  // A photo whose shape cannot fill its frame pins `fit: "contain"` in
  // lib/images.ts so it is never cropped wherever it is reused. An explicit
  // prop here still wins, so callers can always override.
  const effectiveFit = fit ?? (resolved?.fit ?? "cover");
  const fitClass =
    effectiveFit === "contain" ? "object-contain" : "object-cover";

  if (!fill) {
    return (
      <Image
        src={safeResolved.src}
        alt={altText}
        className={cn("h-full w-full", fitClass, imgClassName)}
        sizes={sizes}
        priority={priority}
        width={1600}
        height={1200}
      />
    );
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image
        src={safeResolved.src}
        alt={altText}
        className={cn(
          fitClass,
          "transition-transform duration-700 ease-out",
          imgClassName
        )}
        sizes={sizes}
        priority={priority}
        fill
      />
    </div>
  );
}