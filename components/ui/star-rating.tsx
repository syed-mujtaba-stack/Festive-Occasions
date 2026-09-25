import { cn } from "@/lib/utils";
import { FaStar, FaRegStar } from "react-icons/fa";

/**
 * Star rating UI — two variants:
 *  - <Stars />        display-only (cards, empty-state)
 *  - <StarInput />    interactive 1–5 picker (review form)
 */

export function Stars({
  value,
  size = "text-base",
  className,
}: {
  value: number;
  size?: string;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", size, className)}
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden
          className={i <= value ? "text-champagne-deep" : "text-espresso/20"}
        >
          {i <= value ? (
            <FaStar className="h-[0.95em] w-[0.95em]" />
          ) : (
            <FaRegStar className="h-[0.95em] w-[0.95em]" />
          )}
        </span>
      ))}
    </span>
  );
}

export function StarInput({
  value,
  onChange,
  hover = 0,
  onHover,
  size = "text-2xl",
}: {
  value: number;
  onChange: (v: number) => void;
  hover?: number;
  onHover?: (v: number) => void;
  size?: string;
}) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((i) => {
        const active = i <= (hover || value);
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={value === i}
            aria-label={`${i} star${i > 1 ? "s" : ""}`}
            onMouseEnter={() => onHover?.(i)}
            onMouseLeave={() => onHover?.(0)}
            onClick={() => onChange(i)}
            className={cn(
              "leading-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne",
              size,
              active ? "text-champagne-deep" : "text-espresso/20 hover:text-champagne/70"
            )}
          >
            {active ? (
              <FaStar className="h-[0.95em] w-[0.95em]" />
            ) : (
              <FaRegStar className="h-[0.95em] w-[0.95em]" />
            )}
          </button>
        );
      })}
    </div>
  );
}