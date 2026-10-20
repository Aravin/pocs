import { cn } from "@/lib/utils";

export function TiletRule({
  className,
  tone = "gold",
}: {
  className?: string;
  tone?: "gold" | "forest" | "muted";
}) {
  const stroke =
    tone === "forest" ? "#0B2B1F" : tone === "muted" ? "#C9A45C" : "#C9A45C";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 10"
      preserveAspectRatio="none"
      className={cn("h-2 w-full", className)}
    >
      <g stroke={stroke} strokeWidth="0.8" fill="none" opacity="0.7">
        <path d="M0 5h240" />
        {Array.from({ length: 24 }).map((_, index) => (
          <path
            key={index}
            d={`M${index * 10 + 5} 1.5 8 5 ${index * 10 + 5} 8.5 2 5Z`}
          />
        ))}
      </g>
    </svg>
  );
}

export function MeskelStar({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className={cn("size-6", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M20 2v36M2 20h36M7.3 7.3l25.4 25.4M32.7 7.3 7.3 32.7" opacity="0.5" />
      <path d="M20 8l3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9Z" />
      <circle cx="20" cy="20" r="3.2" />
    </svg>
  );
}

export function SectionEyebrow({
  children,
  tone = "gold",
  className,
}: {
  children: React.ReactNode;
  tone?: "gold" | "forest";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.32em]",
        tone === "gold" ? "text-gold-deep" : "text-cream/70",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block h-px w-8",
          tone === "gold" ? "bg-gold-deep/60" : "bg-cream/40",
        )}
      />
      {children}
    </span>
  );
}

export function TiletField({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={cn("absolute inset-0 size-full", className)}
    >
      <defs>
        <pattern id="tilet" width="28" height="28" patternUnits="userSpaceOnUse">
          <g stroke="#C9A45C" strokeWidth="0.6" fill="none" opacity="0.35">
            <path d="M14 2 26 14 14 26 2 14Z" />
            <path d="M14 9 19 14 14 19 9 14Z" opacity="0.6" />
          </g>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#tilet)" />
    </svg>
  );
}
