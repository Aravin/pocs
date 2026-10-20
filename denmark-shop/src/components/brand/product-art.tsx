import { cn } from "@/lib/utils";
import type { PackageKind } from "@/lib/types";

interface ProductArtProps {
  name: string;
  weight: string;
  kind: PackageKind;
  accent: string;
  className?: string;
  compact?: boolean;
}

const wrap = (text: string, max: number) => {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  if (lines.length <= 2) return lines;
  return [lines[0], `${lines.slice(1).join(" ").slice(0, max - 1)}…`];
};

function Label({
  name,
  weight,
  x,
  y,
  width,
  height,
}: {
  name: string;
  weight: string;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  const lines = wrap(name, 13);
  const fontSize = lines.length > 1 ? 17 : 20;
  const center = x + width / 2;
  const startY = y + height / 2 - (lines.length - 1) * 10 + 4;

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="3" fill="#0B2B1F" />
      <rect
        x={x + 4}
        y={y + 4}
        width={width - 8}
        height={height - 8}
        rx="2"
        fill="none"
        stroke="#C9A45C"
        strokeWidth="0.8"
      />
      <text
        x={center}
        y={y + 22}
        textAnchor="middle"
        fill="#C9A45C"
        fontFamily="var(--font-manrope), sans-serif"
        fontSize="5.4"
        letterSpacing="2.1"
        fontWeight="600"
      >
        MIRACLE HABESHA
      </text>
      <path
        d={`M${x + 16} ${y + 32} H${x + width - 16}`}
        stroke="#C9A45C"
        strokeWidth="0.5"
        opacity="0.6"
      />
      <g fill="#F8F3E9" fontFamily="var(--font-cormorant), Georgia, serif">
        {lines.map((line, index) => (
          <text
            key={line + index}
            x={center}
            y={startY + index * (fontSize + 3)}
            textAnchor="middle"
            fontSize={fontSize}
            fontWeight="600"
            letterSpacing="0.2"
          >
            {line}
          </text>
        ))}
      </g>
      <path
        d={`M${center - 7} ${y + height - 40} l7 5 7-5 -7-5Z`}
        fill="none"
        stroke="#C9A45C"
        strokeWidth="0.8"
      />
      <text
        x={center}
        y={y + height - 14}
        textAnchor="middle"
        fill="#E6C98C"
        fontFamily="var(--font-manrope), sans-serif"
        fontSize="8.5"
        letterSpacing="1.4"
        fontWeight="500"
      >
        {weight.toUpperCase()}
      </text>
    </g>
  );
}

export function ProductArt({
  name,
  weight,
  kind,
  accent,
  className,
  compact = false,
}: ProductArtProps) {
  const uid = `${kind}-${name.replace(/[^a-zA-Z0-9]/g, "")}-${weight.replace(/\W/g, "")}`;
  const bodyGradient = `body-${uid}`;
  const glassGradient = `glass-${uid}`;
  const bgGradient = `bg-${uid}`;
  const shadow = "rgba(7,28,20,0.16)";

  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label={`${name} ${weight}`}
      className={cn("size-full", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={bgGradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FBF6EC" />
          <stop offset="55%" stopColor="#F3E9D6" />
          <stop offset="100%" stopColor="#EADCC2" />
        </linearGradient>
        <radialGradient id={`${bgGradient}-glow`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={bodyGradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.72" />
        </linearGradient>
        <linearGradient id={glassGradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDF8ED" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#EFE3CC" stopOpacity="0.9" />
        </linearGradient>
        <pattern id={`dots-${uid}`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.9" fill={accent} opacity="0.18" />
        </pattern>
      </defs>

      <rect width="400" height="500" fill={`url(#${bgGradient})`} />
      <rect width="400" height="500" fill={`url(#${bgGradient}-glow)`} />
      <rect width="400" height="500" fill={`url(#dots-${uid})`} />
      <g stroke={accent} fill="none" opacity="0.22">
        <circle cx="200" cy="225" r="150" strokeWidth="0.8" strokeDasharray="2 6" />
        <circle cx="200" cy="225" r="128" strokeWidth="0.5" />
        <path d="M56 245c22-52 62-80 92-78M344 245c-22-52-62-80-92-78" strokeWidth="0.7" />
      </g>

      {kind === "pouch" && (
        <g>
          <ellipse cx="200" cy="428" rx="92" ry="14" fill={shadow} />
          <path
            d="M126 116h148v-30c0-6-4-9-10-9H136c-6 0-10 3-10 9v30Z"
            fill={accent}
            opacity="0.85"
          />
          <g stroke="#F8F3E9" strokeWidth="1" opacity="0.35">
            <path d="M132 88v22M142 88v22M152 88v22M162 88v22M172 88v22M182 88v22M192 88v22M202 88v22M212 88v22M222 88v22M232 88v22M242 88v22M252 88v22M262 88v22" />
          </g>
          <path
            d="M120 128c0-8 5-12 14-12h132c9 0 14 4 14 12l10 248c1 30-18 46-52 46h-76c-34 0-53-16-52-46Z"
            fill={`url(#${bodyGradient})`}
            stroke={accent}
            strokeWidth="1"
          />
          <path
            d="M132 136c-4 60-8 180-6 240"
            stroke="#F8F3E9"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.12"
          />
          <path
            d="M274 140c4 70 7 178 4 232"
            stroke="#071C14"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.08"
          />
          <Label name={name} weight={weight} x={136} y={196} width={128} height={178} />
          <g transform="translate(283 372)">
            <circle r="17" fill="#0B2B1F" stroke="#C9A45C" strokeWidth="0.8" />
            <text
              textAnchor="middle"
              y="4"
              fill="#C9A45C"
              fontFamily="var(--font-cormorant), Georgia, serif"
              fontSize="13"
            >
              MH
            </text>
          </g>
        </g>
      )}

      {kind === "jar" && (
        <g>
          <ellipse cx="200" cy="432" rx="86" ry="13" fill={shadow} />
          <rect x="146" y="92" width="108" height="34" rx="8" fill="#0B2B1F" />
          <rect x="146" y="92" width="108" height="34" rx="8" fill="none" stroke="#C9A45C" strokeWidth="1" />
          <g stroke="#C9A45C" strokeWidth="0.6" opacity="0.55">
            <path d="M158 100v18M168 100v18M178 100v18M188 100v18M198 100v18M208 100v18M218 100v18M228 100v18M238 100v18" />
          </g>
          <path
            d="M146 126h108l6 20v244c0 26-16 38-42 38h-36c-26 0-42-12-42-38V146Z"
            fill={`url(#${glassGradient})`}
            stroke={accent}
            strokeWidth="1.2"
            opacity="0.95"
          />
          <path
            d="M140 240v150c0 26 16 38 42 38h36c26 0 42-12 42-38V240Z"
            fill={accent}
            opacity="0.28"
          />
          <path d="M151 160v190" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity="0.45" />
          <Label name={name} weight={weight} x={146} y={196} width={108} height={172} />
          <g transform="translate(200 416)" fill={accent} opacity="0.8">
            <path d="M0-5 5 0 0 5-5 0Z" />
          </g>
        </g>
      )}

      {kind === "coffee-bag" && (
        <g>
          <ellipse cx="200" cy="434" rx="82" ry="13" fill={shadow} />
          <path
            d="M136 92h128v32H136Z"
            fill="#0B2B1F"
          />
          <path
            d="M136 92h128v32H136Z"
            fill="none"
            stroke="#C9A45C"
            strokeWidth="0.9"
          />
          <path
            d="M142 124h116l8 274c1 20-13 32-38 32h-56c-25 0-39-12-38-32Z"
            fill={`url(#${bodyGradient})`}
            stroke={accent}
            strokeWidth="1"
          />
          <path d="M150 124v306" stroke="#F8F3E9" strokeWidth="4" opacity="0.15" />
          <g transform="translate(258 164)">
            <circle r="12" fill="#F8F3E9" stroke={accent} strokeWidth="0.9" />
            <circle r="4.5" fill={accent} opacity="0.8" />
          </g>
          <Label name={name} weight={weight} x={145} y={204} width={110} height={176} />
          <g stroke="#C9A45C" strokeWidth="0.7" opacity="0.65">
            <path d="M160 400h80M160 406h80" />
          </g>
        </g>
      )}

      {kind === "sack" && (
        <g>
          <ellipse cx="200" cy="434" rx="94" ry="13" fill={shadow} />
          <path
            d="M166 104c-6 16-10 30-10 42 0 18 12 28 12 40 0 16-34 40-42 88-8 50 18 124 74 124s82-74 74-124c-8-48-42-72-42-88 0-12 12-22 12-40 0-12-4-26-10-42Z"
            fill={`url(#${bodyGradient})`}
            stroke={accent}
            strokeWidth="1"
          />
          <path
            d="M166 104c10 8 58 8 68 0M170 116h60"
            stroke="#071C14"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.25"
          />
          <path
            d="M160 170c-26 46-34 124-8 178 12 24 32 36 48 38"
            stroke="#F8F3E9"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.12"
            fill="none"
          />
          <g stroke="#F8F3E9" strokeWidth="0.8" opacity="0.35">
            <path d="M150 420h100" strokeDasharray="3 5" />
          </g>
          <Label name={name} weight={weight} x={141} y={214} width={118} height={172} />
        </g>
      )}

      {kind === "tin" && (
        <g>
          <ellipse cx="200" cy="426" rx="96" ry="13" fill={shadow} />
          <rect x="116" y="150" width="168" height="258" rx="6" fill={`url(#${bodyGradient})`} stroke={accent} />
          <rect x="116" y="150" width="168" height="34" rx="6" fill="#0B2B1F" />
          <rect x="116" y="150" width="168" height="34" rx="6" fill="none" stroke="#C9A45C" strokeWidth="0.9" />
          <g fill="#C9A45C" opacity="0.8">
            <circle cx="128" cy="167" r="2" />
            <circle cx="272" cy="167" r="2" />
          </g>
          <path d="M134 192v198M266 192v198" stroke="#F8F3E9" strokeWidth="4" opacity="0.12" strokeLinecap="round" />
          <Label name={name} weight={weight} x={140} y={212} width={120} height={170} />
          <g transform="translate(200 408)" fill="none" stroke="#C9A45C" strokeWidth="0.8">
            <path d="M-14 0h28M0-8v16" opacity="0.6" />
          </g>
        </g>
      )}

      {kind === "bottle" && (
        <g>
          <ellipse cx="200" cy="434" rx="64" ry="11" fill={shadow} />
          <rect x="178" y="86" width="44" height="32" rx="5" fill="#0B2B1F" stroke="#C9A45C" />
          <path
            d="M182 118h36v34c0 16 28 26 28 62v186c0 22-12 32-32 32h-28c-20 0-32-10-32-32V214c0-36 28-46 28-62Z"
            fill={`url(#${glassGradient})`}
            stroke={accent}
          />
          <path
            d="M158 250v150c0 22 12 32 32 32h20c20 0 32-10 32-32V250Z"
            fill={accent}
            opacity="0.3"
          />
          <Label name={name} weight={weight} x={160} y={224} width={80} height={156} />
        </g>
      )}

      {!compact && (
        <g opacity="0.55">
          <text
            x="200"
            y="482"
            textAnchor="middle"
            fill="#0B2B1F"
            fontFamily="var(--font-manrope), sans-serif"
            fontSize="6.5"
            letterSpacing="3"
          >
            ERITREAN &amp; ETHIOPIAN CULTURAL FOOD
          </text>
        </g>
      )}
    </svg>
  );
}
