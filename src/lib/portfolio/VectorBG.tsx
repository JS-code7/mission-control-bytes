import { type CSSProperties } from "react";

/**
 * Organic vector background system.
 * Each variant draws different SVG primitives (flow waves, neural arcs,
 * signal rings, ribbons, etc) so every page feels related but distinct.
 */
export type BGVariant =
  | "home"
  | "story"
  | "lab"
  | "brain"
  | "timeline"
  | "modules"
  | "transmit"
  | "contact";

const C_CYAN = "var(--cyan)";
const C_VIOLET = "var(--purple-glow)";
const C_GOLD = "var(--gold)";
const C_ELEC = "var(--electric)";

const baseWrap: CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  overflow: "hidden",
  zIndex: 0,
};

function Defs() {
  return (
    <defs>
      <linearGradient id="vbg-flow" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor={C_CYAN} stopOpacity="0.55" />
        <stop offset="50%" stopColor={C_ELEC} stopOpacity="0.35" />
        <stop offset="100%" stopColor={C_VIOLET} stopOpacity="0.55" />
      </linearGradient>
      <linearGradient id="vbg-warm" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor={C_GOLD} stopOpacity="0.35" />
        <stop offset="100%" stopColor={C_VIOLET} stopOpacity="0.45" />
      </linearGradient>
      <radialGradient id="vbg-orb" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={C_CYAN} stopOpacity="0.55" />
        <stop offset="100%" stopColor={C_CYAN} stopOpacity="0" />
      </radialGradient>
      <radialGradient id="vbg-orb2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={C_VIOLET} stopOpacity="0.5" />
        <stop offset="100%" stopColor={C_VIOLET} stopOpacity="0" />
      </radialGradient>
      <filter id="vbg-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="22" />
      </filter>
    </defs>
  );
}

function Ambient({ tone = "cool" }: { tone?: "cool" | "warm" }) {
  return (
    <>
      <circle cx="18%" cy="22%" r="260" fill={tone === "warm" ? "url(#vbg-orb2)" : "url(#vbg-orb)"} />
      <circle cx="82%" cy="78%" r="320" fill={tone === "warm" ? "url(#vbg-orb)" : "url(#vbg-orb2)"} />
    </>
  );
}

/* ---- HOME: flowing energy waves ---- */
function HomeArt() {
  return (
    <g>
      <Ambient />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M -50 ${260 + i * 80} C 300 ${180 + i * 70}, 700 ${360 + i * 60}, 1100 ${220 + i * 80} S 1600 ${300 + i * 70}, 1900 ${250 + i * 80}`}
          fill="none"
          stroke="url(#vbg-flow)"
          strokeWidth={1 + i * 0.3}
          strokeOpacity={0.55 - i * 0.08}
        >
          <animate
            attributeName="d"
            dur={`${14 + i * 2}s`}
            repeatCount="indefinite"
            values={`
              M -50 ${260 + i * 80} C 300 ${180 + i * 70}, 700 ${360 + i * 60}, 1100 ${220 + i * 80} S 1600 ${300 + i * 70}, 1900 ${250 + i * 80};
              M -50 ${260 + i * 80} C 300 ${260 + i * 70}, 700 ${240 + i * 60}, 1100 ${320 + i * 80} S 1600 ${220 + i * 70}, 1900 ${300 + i * 80};
              M -50 ${260 + i * 80} C 300 ${180 + i * 70}, 700 ${360 + i * 60}, 1100 ${220 + i * 80} S 1600 ${300 + i * 70}, 1900 ${250 + i * 80}
            `}
          />
        </path>
      ))}
    </g>
  );
}

/* ---- STORY: cinematic motion trails ---- */
function StoryArt() {
  return (
    <g>
      <Ambient tone="warm" />
      {Array.from({ length: 18 }).map((_, i) => (
        <line
          key={i}
          x1={-100 + i * 110}
          y1={0}
          x2={200 + i * 110}
          y2={900}
          stroke="url(#vbg-warm)"
          strokeOpacity={0.18 + (i % 3) * 0.08}
          strokeWidth={0.6}
        />
      ))}
      <path
        d="M 0 500 Q 480 300 960 520 T 1920 480"
        fill="none"
        stroke="url(#vbg-warm)"
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />
    </g>
  );
}

/* ---- LAB: signal rings ---- */
function LabArt() {
  return (
    <g>
      <Ambient />
      {[120, 220, 340, 480, 640].map((r, i) => (
        <circle
          key={r}
          cx="85%"
          cy="30%"
          r={r}
          fill="none"
          stroke={C_CYAN}
          strokeOpacity={0.22 - i * 0.03}
          strokeDasharray="2 8"
        />
      ))}
      {[80, 160, 260, 380].map((r, i) => (
        <circle
          key={r}
          cx="12%"
          cy="80%"
          r={r}
          fill="none"
          stroke={C_VIOLET}
          strokeOpacity={0.22 - i * 0.04}
        />
      ))}
    </g>
  );
}

/* ---- BRAIN: connected arcs ---- */
function BrainArt() {
  const nodes = [
    [200, 200], [420, 140], [640, 260], [880, 160], [1100, 280],
    [320, 420], [560, 520], [800, 460], [1040, 580], [1300, 360],
  ];
  return (
    <g>
      <Ambient />
      {nodes.map(([x, y], i) =>
        nodes.slice(i + 1).map(([x2, y2], j) => {
          if (Math.hypot(x - x2, y - y2) > 380) return null;
          const mx = (x + x2) / 2;
          const my = (y + y2) / 2 - 60;
          return (
            <path
              key={`${i}-${j}`}
              d={`M ${x} ${y} Q ${mx} ${my} ${x2} ${y2}`}
              fill="none"
              stroke="url(#vbg-flow)"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
          );
        })
      )}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={C_CYAN} opacity="0.8" />
      ))}
    </g>
  );
}

/* ---- TIMELINE: curved progression ---- */
function TimelineArt() {
  return (
    <g>
      <Ambient tone="warm" />
      <path
        d="M 0 600 C 400 200, 800 900, 1200 400 S 1900 700, 2200 300"
        fill="none"
        stroke="url(#vbg-warm)"
        strokeWidth="2"
        strokeOpacity="0.55"
      />
      <path
        d="M 0 640 C 400 240, 800 940, 1200 440 S 1900 740, 2200 340"
        fill="none"
        stroke={C_GOLD}
        strokeWidth="0.6"
        strokeOpacity="0.4"
        strokeDasharray="3 9"
      />
    </g>
  );
}

/* ---- MODULES: data grid ribbons ---- */
function ModulesArt() {
  return (
    <g>
      <Ambient />
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={i}
          d={`M -100 ${120 + i * 130} L 2000 ${80 + i * 130}`}
          stroke={C_CYAN}
          strokeOpacity={0.1}
          strokeWidth="0.6"
        />
      ))}
      <path
        d="M 0 300 C 500 260, 900 460, 1400 320 S 1900 380, 2100 300"
        fill="none"
        stroke="url(#vbg-flow)"
        strokeWidth="1.4"
        strokeOpacity="0.55"
      />
      <path
        d="M 0 540 C 500 580, 900 380, 1400 540 S 1900 480, 2100 560"
        fill="none"
        stroke="url(#vbg-flow)"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
    </g>
  );
}

/* ---- TRANSMIT: scan stream ---- */
function TransmitArt() {
  return (
    <g>
      <Ambient />
      {Array.from({ length: 40 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          x2="2000"
          y1={i * 28}
          y2={i * 28}
          stroke={C_CYAN}
          strokeOpacity={i % 4 === 0 ? 0.18 : 0.06}
          strokeWidth="0.5"
        />
      ))}
      <path
        d="M 0 420 L 200 420 L 240 360 L 320 480 L 400 380 L 520 420 L 2000 420"
        fill="none"
        stroke={C_CYAN}
        strokeOpacity="0.7"
        strokeWidth="1.2"
      />
    </g>
  );
}

/* ---- CONTACT: soft ambient geometry ---- */
function ContactArt() {
  return (
    <g>
      <Ambient tone="warm" />
      <circle cx="50%" cy="50%" r="220" fill="none" stroke={C_VIOLET} strokeOpacity="0.18" />
      <circle cx="50%" cy="50%" r="360" fill="none" stroke={C_CYAN} strokeOpacity="0.14" />
      <circle cx="50%" cy="50%" r="520" fill="none" stroke={C_GOLD} strokeOpacity="0.1" />
    </g>
  );
}

const ART: Record<BGVariant, () => JSX.Element> = {
  home: HomeArt,
  story: StoryArt,
  lab: LabArt,
  brain: BrainArt,
  timeline: TimelineArt,
  modules: ModulesArt,
  transmit: TransmitArt,
  contact: ContactArt,
};

export function VectorBG({
  variant = "home",
  fade = true,
}: {
  variant?: BGVariant;
  fade?: boolean;
}) {
  const Art = ART[variant];
  return (
    <div style={baseWrap} aria-hidden>
      {/* faint grid for depth */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <svg
        viewBox="0 0 1920 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        style={{
          maskImage: fade
            ? "radial-gradient(ellipse at center, black 55%, transparent 95%)"
            : undefined,
        }}
      >
        <Defs />
        <Art />
      </svg>
      {/* warm/ambient glow wash */}
      <div className="absolute inset-0 radial-glow opacity-60" />
    </div>
  );
}
