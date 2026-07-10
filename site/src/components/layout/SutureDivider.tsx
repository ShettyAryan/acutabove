import { cn } from "@/lib/utils";

type SutureDividerProps = {
  className?: string;
  tone?: "primary" | "cream";
};

/**
 * A single running line of surgical stitches. Used sparingly as the site's
 * one recurring signature mark instead of a generic <hr />.
 */
export function SutureDivider({
  className,
  tone = "primary",
}: SutureDividerProps) {
  const color = tone === "primary" ? "text-primary/30" : "text-white/25";
  const stitches = Array.from({ length: 14 });

  return (
    <div
      aria-hidden="true"
      className={cn("flex w-full items-center justify-center", className)}
    >
      <svg
        viewBox="0 0 560 20"
        className={cn("h-5 w-full max-w-xs", color)}
        fill="none"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="10"
          x2="560"
          y2="10"
          stroke="currentColor"
          strokeWidth="1"
        />
        {stitches.map((_, i) => {
          const x = 20 + i * 40;
          return (
            <path
              key={i}
              d={`M ${x - 7} 2 L ${x + 7} 18 M ${x + 7} 2 L ${x - 7} 18`}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
}
