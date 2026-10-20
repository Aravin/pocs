import { cn } from "@/lib/utils";

export function BrandSeal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="Miracle Habesha Shop"
      className={cn("size-12", className)}
    >
      <defs>
        <linearGradient id="seal-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E6C98C" />
          <stop offset="48%" stopColor="#C9A45C" />
          <stop offset="100%" stopColor="#9C7830" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#0B2B1F" />
      <circle cx="60" cy="60" r="56" fill="none" stroke="url(#seal-gold)" strokeWidth="2" />
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="none"
        stroke="url(#seal-gold)"
        strokeWidth="0.8"
        strokeDasharray="1 3"
        opacity="0.85"
      />
      <circle cx="60" cy="60" r="43" fill="none" stroke="url(#seal-gold)" strokeWidth="1" />
      <g fill="url(#seal-gold)">
        <path d="M60 10.5c1.2 2 1.2 3.9 0 5.8-1.2-1.9-1.2-3.8 0-5.8Z" />
        <path d="M60 103.7c1.2 2 1.2 3.9 0 5.8-1.2-1.9-1.2-3.8 0-5.8Z" />
        <path d="M10.5 60c2-1.2 3.9-1.2 5.8 0-1.9 1.2-3.8 1.2-5.8 0Z" />
        <path d="M103.7 60c2-1.2 3.9-1.2 5.8 0-1.9 1.2-3.8 1.2-5.8 0Z" />
      </g>
      <g stroke="url(#seal-gold)" strokeWidth="1.1" fill="none">
        <path d="M42 92c2.6 0 4.4-1.6 4.4-4.1 0-2.2-1.4-3.5-3.2-4.6" />
        <path d="M78 92c-2.6 0-4.4-1.6-4.4-4.1 0-2.2 1.4-3.5 3.2-4.6" />
      </g>
      <g fill="none" stroke="url(#seal-gold)" strokeWidth="0.9" opacity="0.9">
        <path d="M31 43c4-7 10-11 14-10-1 4-6 9-14 10Z" />
        <path d="M89 43c-4-7-10-11-14-10 1 4 6 9 14 10Z" />
        <path d="M33 47c5-3 10-4 13-2-3 3-8 5-13 2Z" />
        <path d="M87 47c-5-3-10-4-13-2 3 3 8 5 13 2Z" />
      </g>
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fill="url(#seal-gold)"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontSize="25"
        letterSpacing="1"
      >
        MH
      </text>
      <text
        x="60"
        y="82"
        textAnchor="middle"
        fill="url(#seal-gold)"
        fontFamily="var(--font-manrope), sans-serif"
        fontSize="5.1"
        letterSpacing="1.6"
      >
        MIRACLE HABESHA
      </text>
      <path d="M52 30h16" stroke="url(#seal-gold)" strokeWidth="0.9" />
      <path d="M60 27v6M57 30h6" stroke="url(#seal-gold)" strokeWidth="0.9" />
    </svg>
  );
}

export function BrandLockup({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <BrandSeal className={compact ? "size-10" : "size-12"} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] font-semibold tracking-[0.16em] text-gold-gradient">
          MIRACLE
        </span>
        <span className="mt-1 font-sans text-[0.55rem] font-semibold tracking-[0.34em] text-foreground/70">
          HABESHA SHOP
        </span>
      </span>
    </span>
  );
}
