// Design illustrations for each device. Colours come from CSS classes (see styles/art.css)
// so the drawings follow the light and dark themes.

function Stethoscope() {
  const pcgPath = 'M214 112h18l6-16 8 30 7-20 5 6h20l6-16 8 30 7-20 5 6h12'
  const lungPath = 'M214 164c12-14 24-14 36 0s24 14 36 0 18-14 30 0'
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true" focusable="false">
      <circle className="art-halo" cx="210" cy="150" r="138" />
      <circle className="art-soft" cx="210" cy="150" r="128" />
      <path className="art-wave art-wave--1" d="M44 188q-11 24 0 48" />
      <path className="art-wave art-wave--2" d="M28 176q-17 36 0 72" />
      <path className="art-tube" d="M196 236C160 272 128 274 112 246" />
      <g className="art-sensor-head">
        <circle className="art-body" cx="92" cy="212" r="38" />
        <circle className="art-diaphragm" cx="92" cy="212" r="25" />
        <circle className="art-dot" cx="92" cy="212" r="4" />
      </g>
      <rect className="art-body" x="190" y="52" width="152" height="206" rx="26" />
      <rect className="art-screen" x="206" y="72" width="120" height="116" rx="10" />
      <path className="art-grid" d="M214 102h104M214 136h104M214 168h104M248 80v100M284 80v100" />
      <path className="art-trace-ghost" d={pcgPath} />
      <path className="art-trace-accent art-trace-live" pathLength="100" d={pcgPath} />
      <path className="art-trace-ghost-warm" d={lungPath} />
      <path className="art-trace-warm art-trace-live-slow" pathLength="100" d={lungPath} />
      <circle className="art-fill-accent" cx="244" cy="222" r="11" />
      <circle className="art-ring" cx="290" cy="222" r="11" />
      <circle className="art-led-glow" cx="318" cy="64" r="8" />
      <circle className="art-led" cx="318" cy="64" r="3.5" />
    </svg>
  )
}

function CoughListener() {
  const coughBurst = 'M26 118h14l5-22 7 44 6-30 5 12h14'
  const ambientWave = 'M26 178c8-10 16-10 24 0s16 10 24 0 12-10 18 0'
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true" focusable="false">
      <circle className="art-halo" cx="230" cy="150" r="130" />
      <circle className="art-soft" cx="230" cy="150" r="120" />
      <path className="art-trace-ghost-warm" d={coughBurst} />
      <path className="art-trace-warm art-trace-live" pathLength="100" d={coughBurst} />
      <path className="art-trace-muted art-trace-float" d={ambientWave} />
      <path className="art-wave art-wave--1" d="M108 132q-9 18 0 36" />
      <path className="art-wave art-wave--2" d="M96 122q-14 28 0 56" />
      <path className="art-ground" d="M118 258h236" />
      <rect className="art-body" x="140" y="74" width="180" height="184" rx="34" />
      <g className="art-dot">
        <circle cx="206" cy="96" r="3" /><circle cx="222" cy="96" r="3" /><circle cx="238" cy="96" r="3" /><circle cx="254" cy="96" r="3" />
        <circle cx="214" cy="108" r="3" /><circle cx="230" cy="108" r="3" /><circle cx="246" cy="108" r="3" />
      </g>
      <circle className="art-ring-thick" cx="230" cy="164" r="36" />
      <path className="art-ring-active art-ring-spin" d="M230 128a36 36 0 0 1 34 24" />
      <circle className="art-diaphragm" cx="230" cy="164" r="22" />
      <rect className="art-screen" x="180" y="218" width="100" height="22" rx="6" />
      <path className="art-screen-line art-screen-bar" pathLength="100" d="M190 229h44" />
      <circle className="art-led-glow" cx="266" cy="229" r="8" />
      <circle className="art-led" cx="266" cy="229" r="4" />
    </svg>
  )
}

function EcgPatch() {
  const ecgLead = 'M30 72h30l5-10 6 10h10l4 8 6-34 6 40 4-14h20l5-10 6 10h8l4 8 6-34 6 40 4-14h4l4 6 6-30 5 34 4-12h22l5-10 6 10h10l4 8 6-34 6 40 4-14h24'
  const miniEcg = 'M326 150h8l3-8 4 16 3-12 3 4h8l3-8 4 16 3-12h5'
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true" focusable="false">
      <circle className="art-halo" cx="170" cy="160" r="132" />
      <circle className="art-soft" cx="170" cy="160" r="122" />
      <rect className="art-flag art-flag-pulse" x="146" y="40" width="58" height="56" rx="6" />
      <path className="art-trace-ghost-primary" d={ecgLead} />
      <path className="art-trace-primary art-trace-live" pathLength="100" d={ecgLead} />
      <rect className="art-body" x="44" y="124" width="236" height="112" rx="56" />
      <circle className="art-diaphragm" cx="102" cy="180" r="28" />
      <circle className="art-dot" cx="102" cy="180" r="7" />
      <circle className="art-diaphragm" cx="222" cy="180" r="28" />
      <circle className="art-dot" cx="222" cy="180" r="7" />
      <path className="art-grid" d="M130 180h18M176 180h18" />
      <rect className="art-screen" x="146" y="156" width="32" height="48" rx="5" />
      <path className="art-screen-line" d="M154 170h16M154 180h16M154 190h10" />
      <path className="art-wave art-wave--1" d="M292 168q8-8 0-16" />
      <path className="art-wave art-wave--2" d="M302 176q16-16 0-32" />
      <rect className="art-body" x="314" y="96" width="66" height="128" rx="12" />
      <rect className="art-screen" x="322" y="110" width="50" height="94" rx="5" />
      <path className="art-trace-ghost" d={miniEcg} />
      <path className="art-trace-accent-thin art-trace-live" pathLength="100" d={miniEcg} />
      <rect className="art-flag-line art-flag-pulse" x="342" y="138" width="16" height="26" rx="2" />
    </svg>
  )
}

function HearingScreener() {
  return (
    <svg viewBox="0 0 400 300" aria-hidden="true" focusable="false">
      <circle className="art-halo" cx="190" cy="150" r="134" />
      <circle className="art-soft" cx="190" cy="150" r="124" />
      <path className="art-band" d="M100 150C100 54 246 54 246 150" />
      <rect className="art-body" x="78" y="128" width="44" height="72" rx="18" />
      <rect className="art-body" x="224" y="128" width="44" height="72" rx="18" />
      <path className="art-wave art-wave--1" d="M136 150q8 14 0 28" />
      <path className="art-wave art-wave--2" d="M148 142q14 22 0 44" />
      <path className="art-wave art-wave--1" d="M210 150q-8 14 0 28" />
      <path className="art-tube" d="M246 196C254 236 270 246 290 236" />
      <rect className="art-body" x="268" y="168" width="116" height="104" rx="18" />
      <rect className="art-screen" x="282" y="182" width="88" height="36" rx="6" />
      <g className="art-bars">
        <rect className="art-bar-1" x="292" y="202" width="7" height="8" rx="1.5" />
        <rect className="art-bar-2" x="304" y="196" width="7" height="14" rx="1.5" />
        <rect className="art-bar-3" x="316" y="192" width="7" height="18" rx="1.5" />
        <rect className="art-bar-4" x="328" y="198" width="7" height="12" rx="1.5" />
        <rect className="art-bar-5" x="340" y="194" width="7" height="16" rx="1.5" />
        <rect className="art-bar-6" x="352" y="200" width="7" height="10" rx="1.5" />
      </g>
      <circle className="art-fill-warm" cx="326" cy="246" r="16" />
      <circle className="art-ring" cx="364" cy="246" r="6" />
      <path className="art-wave-muted art-wave--1" d="M364 230q8-6 16 0" />
      <path className="art-wave-muted art-wave--2" d="M360 222q12-10 24 0" />
    </svg>
  )
}

const art: Record<string, () => React.JSX.Element> = {
  'edge-ai-stethoscope': Stethoscope,
  'cough-listener': CoughListener,
  'ecg-patch': EcgPatch,
  'hearing-screener': HearingScreener,
}

export function hasDeviceArt(slug: string) {
  return slug in art
}

export default function DeviceArt({ slug, className = '' }: { slug: string; className?: string }) {
  const Art = art[slug]
  if (!Art) return null
  return <div className={`device-art ${className}`}><Art /></div>
}
