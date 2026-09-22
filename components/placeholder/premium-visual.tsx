import { cn } from "@/lib/utils";

/**
 * PremiumPlaceholder — locally generated editorial SVG scenes.
 *
 * The client asked NOT to download images, so every visual on the site is an
 * abstract, brand-true composition rendered from design tokens (no photos).
 * Each placeholder is deterministic per `seed` and carries a `label` that
 * describes the real asset it will be replaced by (client project photo).
 *
 * Replace usages with <Image src={clientPhoto} /> once real assets arrive.
 */

type Theme = "champagne" | "burgundy" | "evergreen" | "night" | "ivory";

const themes: Record<
  Theme,
  { bg: [string, string]; fg: string; line: string; accent: string }
> = {
  champagne: {
    bg: ["#262020", "#171312"],
    fg: "#C6A15B",
    line: "rgba(229,211,172,0.55)",
    accent: "#E5D3AC",
  },
  burgundy: {
    bg: ["#2b1a1d", "#171312"],
    fg: "#a56a6f",
    line: "rgba(230,200,203,0.4)",
    accent: "#c99aa0",
  },
  evergreen: {
    bg: ["#1c2c22", "#131c16"],
    fg: "#8fb39b",
    line: "rgba(200,225,208,0.4)",
    accent: "#c9e0d0",
  },
  night: {
    bg: ["#201c1a", "#140f0d"],
    fg: "#C6A15B",
    line: "rgba(229,211,172,0.4)",
    accent: "#E5D3AC",
  },
  ivory: {
    bg: ["#efe9dd", "#e3d9c7"],
    fg: "#C6A15B",
    line: "rgba(38,32,32,0.35)",
    accent: "#262020",
  },
};

export function PremiumPlaceholder({
  seed = "festive",
  theme = "champagne",
  label = "Festive Occasions",
  variant = "arch",
  className,
  ariaHidden = false,
}: {
  seed?: string;
  theme?: Theme;
  label?: string;
  variant?: "arch" | "portrait" | "wide" | "square";
  className?: string;
  ariaHidden?: boolean;
}) {
  const t = themes[theme];
  // Keep palette deterministic per seed without pulling in a hashing lib.
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const treeH = 34 + (h % 18); // tree height % of viewport
  const offset = (h % 100) / 100;

  const [g1, g2] = t.bg;
  const viewBox =
    variant === "wide" ? "0 0 1600 900" : variant === "square" ? "0 0 1200 1200" : "0 0 1200 1500";

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : `${label} (placeholder visual)`}
      aria-hidden={ariaHidden || undefined}
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={`pg-${seed}`} x1="0" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor={g1} />
            <stop offset="100%" stopColor={g2} />
          </linearGradient>
          <radialGradient id={`pg-glow-${seed}`} cx="0.72" cy="0.24" r="0.7">
            <stop offset="0%" stopColor={t.accent} stopOpacity="0.35" />
            <stop offset="55%" stopColor={t.accent} stopOpacity="0.06" />
            <stop offset="100%" stopColor={t.accent} stopOpacity="0" />
          </radialGradient>
          <pattern
            id={`pg-grain-${seed}`}
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <rect width="120" height="120" fill="url(#pg-grain-fill)" opacity="0.04" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#pg-${seed})`} />
        <rect width="100%" height="100%" fill={`url(#pg-glow-${seed})`} />

        {/* Fine vertical hairline grid — editorial restraint */}
        {[0.2, 0.4, 0.6, 0.8].map((x) => (
          <line
            key={x}
            x1={`${x * 100}%`}
            y1="0"
            x2={`${x * 100}%`}
            y2="100%"
            stroke={t.line}
            strokeWidth="0.5"
            strokeDasharray="3 9"
            opacity="0.5"
          />
        ))}

        {/* Central tree silhouette — minimal line art */}
        <g
          transform={`translate(${46 + (offset % 6)}% ${100 - treeH}%)`}
          opacity="0.9"
        >
          {[0, 1, 2].map((i) => {
            const w = 34 - i * 9;
            const y = i * 13;
            return (
              <polygon
                key={`layer-${i}`}
                points={`0 ${y} ${w / 2} ${y + 14} ${w} ${y}`}
                fill="none"
                stroke={t.fg}
                strokeWidth="1.4"
                strokeLinejoin="round"
                opacity={0.55 + i * 0.2}
              />
            );
          })}
          <line
            x1="17"
            y1="39"
            x2="17"
            y2="44"
            stroke={t.fg}
            strokeWidth="2"
          />
          <rect x="13.5" y="44" width="7" height="3" fill={t.fg} opacity="0.7" />
        </g>

        {/* Champagne ring — AKT decorative detail */}
        <circle
          cx="80%"
          cy="20%"
          r="52"
          fill="none"
          stroke={t.fg}
          strokeWidth="1"
          opacity="0.5"
        />
        <circle
          cx="80%"
          cy="20%"
          r="44"
          fill="none"
          stroke={t.line}
          strokeWidth="0.6"
          strokeDasharray="2 6"
          opacity="0.6"
        />

        {/* Corner frames */}
        <rect
          x="24"
          y="24"
          width="64"
          height="64"
          fill="none"
          stroke={t.line}
          strokeWidth="1"
          opacity="0.6"
        />
        <rect
          x="100% - 88"
          y="100% - 88"
          width="64"
          height="64"
          transform="translate(-88,-88)"
          fill="none"
          stroke={t.line}
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>

      {/* Label band — describes what replaces this placeholder */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
        <div>
          <p className="text-label text-ivory/60">{label}</p>
          <p className="mt-1 font-display text-lg italic text-ivory/85">
            Festive Occasions
          </p>
        </div>
        <span className="text-label text-champagne">DUBAI · UAE</span>
      </div>
    </div>
  );
}