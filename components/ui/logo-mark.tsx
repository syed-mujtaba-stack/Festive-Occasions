import { cn } from "@/lib/utils";

/**
 * LogoMark — the Festive Occasions monogram seal.
 *
 * A thin champagne ring with a hairline inner ring, the "FO" monogram set in
 * the serif display face (italic), and a four-point sparkle (the favicon
 * motif) resting at the top of the ring. Designed to inherit text color so it
 * reads correctly on dark (navbar, footer) backgrounds.
 *
 * Wrap in an element with `group` to unlock the hover state: the ring fills
 * champagne and the letters invert to espresso.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-champagne/70 bg-transparent transition-colors duration-500 group-hover:border-champagne group-hover:bg-champagne",
        className
      )}
    >
      {/* hairline inner ring */}
      <span className="absolute inset-[4px] rounded-full border border-champagne/30 transition-colors duration-500 group-hover:border-espresso/30" />

      {/* four-point sparkle — echoes the brand favicon */}
      <svg
        viewBox="0 0 24 24"
        className="absolute -top-[5px] left-1/2 h-3 w-3 -translate-x-1/2 text-champagne transition-transform duration-700 group-hover:rotate-45"
        aria-hidden
      >
        <path
          d="M12 1.5c.85 5.2 3.3 7.9 10.5 10.5C15.3 14.6 12.85 17.3 12 22.5c-.85-5.2-3.3-7.9-10.5-10.5C8.7 9.4 11.15 6.7 12 1.5z"
          fill="currentColor"
        />
      </svg>

      {/* monogram letters */}
      <span className="relative font-display text-[1rem] italic leading-none tracking-[-0.02em] text-champagne transition-colors duration-500 group-hover:text-espresso">
        FO
      </span>
    </span>
  );
}