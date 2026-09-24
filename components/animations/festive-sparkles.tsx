"use client";

interface Sparkle {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}

const SPARKLES: Sparkle[] = [
  { id: 1, top: "12%", left: "18%", size: 4, delay: 0.2, duration: 2.4 },
  { id: 2, top: "24%", left: "82%", size: 5, delay: 0.8, duration: 3.1 },
  { id: 3, top: "35%", left: "45%", size: 3, delay: 1.4, duration: 2.8 },
  { id: 4, top: "65%", left: "15%", size: 4, delay: 0.5, duration: 3.4 },
  { id: 5, top: "78%", left: "75%", size: 5, delay: 1.9, duration: 2.6 },
  { id: 6, top: "15%", left: "62%", size: 3, delay: 2.2, duration: 3.0 },
  { id: 7, top: "85%", left: "38%", size: 4, delay: 1.1, duration: 2.7 },
  { id: 8, top: "48%", left: "92%", size: 4, delay: 0.4, duration: 3.2 },
];

export function FestiveSparkles({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden z-20 motion-reduce:hidden ${className}`}
    >
      {SPARKLES.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-champagne animate-pulse shadow-[0_0_12px_#dfba73]"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
