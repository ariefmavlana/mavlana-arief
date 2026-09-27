const BlackHole = () => (
  <div
    className="black-hole"
    role="img"
    aria-label="Ilustrasi lubang hitam dengan cakram akresi, cincin foton, dan horizon peristiwa."
  >
    <svg className="black-hole-visual" viewBox="0 0 640 640" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="black-hole-space" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#020617" stopOpacity="0" />
          <stop offset="62%" stopColor="#0f172a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="black-hole-disk" x1="83" y1="316" x2="561" y2="316" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7dd3fc" stopOpacity="0" />
          <stop offset="0.18" stopColor="#c4b5fd" stopOpacity="0.52" />
          <stop offset="0.43" stopColor="#f8fafc" stopOpacity="0.96" />
          <stop offset="0.61" stopColor="#bae6fd" stopOpacity="0.8" />
          <stop offset="0.82" stopColor="#818cf8" stopOpacity="0.28" />
          <stop offset="1" stopColor="#7dd3fc" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="black-hole-falloff" x1="320" y1="230" x2="320" y2="399" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dbeafe" stopOpacity="0.32" />
          <stop offset="0.51" stopColor="#38bdf8" stopOpacity="0" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0.42" />
        </linearGradient>
        <radialGradient id="black-hole-core" cx="50%" cy="42%" r="65%">
          <stop stopColor="#080d19" />
          <stop offset="0.48" stopColor="#030712" />
          <stop offset="0.78" stopColor="#01030a" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <filter id="black-hole-glow" x="-40%" y="-130%" width="180%" height="360%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      <circle cx="320" cy="320" r="280" fill="url(#black-hole-space)" />
      <ellipse className="black-hole-aura" cx="320" cy="320" rx="245" ry="122" stroke="#7dd3fc" strokeOpacity="0.14" />

      <g className="black-hole-accretion">
        <ellipse cx="320" cy="316" rx="230" ry="74" stroke="url(#black-hole-disk)" strokeWidth="30" filter="url(#black-hole-glow)" opacity="0.58" />
        <ellipse cx="320" cy="316" rx="230" ry="74" stroke="url(#black-hole-disk)" strokeWidth="9" opacity="0.9" />
        <ellipse cx="320" cy="316" rx="191" ry="57" stroke="url(#black-hole-falloff)" strokeWidth="12" opacity="0.82" />
      </g>

      <ellipse cx="320" cy="316" rx="119" ry="41" fill="#020617" opacity="0.87" />
      <circle className="black-hole-photon-ring" cx="320" cy="302" r="108" stroke="#e0f2fe" strokeOpacity="0.54" strokeWidth="2" />
      <circle className="black-hole-core" cx="320" cy="302" r="94" fill="url(#black-hole-core)" />
      <circle cx="320" cy="302" r="94" stroke="#bfdbfe" strokeOpacity="0.13" />
      <path className="black-hole-highlight" d="M245 256C264 217 306 201 348 209" stroke="#e0f2fe" strokeOpacity="0.36" strokeWidth="3" strokeLinecap="round" />
      <path className="black-hole-highlight" d="M392 364C370 387 336 399 304 394" stroke="#a5b4fc" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
)

export default BlackHole
