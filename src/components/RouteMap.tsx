/**
 * The signature motif: a stylised trail map of the island with the
 * Big Walk route winding from the start waypoint to the summit.
 */
export default function RouteMap({ label }: { label?: string }) {
  const dots = [
    { x: 118, y: 342 },
    { x: 168, y: 266 },
    { x: 128, y: 184 },
    { x: 196, y: 118 },
    { x: 268, y: 84 },
  ];
  return (
    <svg
      className="hero__route"
      viewBox="0 0 360 400"
      role="img"
      aria-label={
        label ??
        "Stylised trail map of the Big Walk island with the route marked from start to summit"
      }
    >
      {/* island contour blobs */}
      <g fill="none" stroke="rgba(224,238,229,0.10)" strokeWidth="1.2">
        <path d="M210,84 C236,60 274,58 296,80 C318,102 314,140 292,160 C268,182 226,182 206,160 C188,140 186,108 210,84 Z" />
        <path d="M222,100 C240,84 266,84 282,98 C298,112 294,138 278,150 C260,162 236,160 224,148 C214,136 206,116 222,100 Z" />
        <path d="M168,238 C146,208 152,166 182,148 C214,130 252,146 262,176 C272,206 252,240 220,250 C192,258 180,254 168,238 Z" />
        <path d="M150,306 C118,292 104,254 122,228 C142,202 184,204 198,230 C212,256 200,292 172,306 C160,312 158,312 150,306 Z" />
        <path d="M92,220 C68,196 66,156 92,138 C120,120 156,138 160,166 C164,192 138,222 108,224 C100,224 96,224 92,220 Z" />
      </g>
      {/* faint contour rings */}
      <g fill="none" stroke="rgba(224,238,229,0.07)" strokeWidth="1">
        <path d="M40,360 C20,320 30,260 70,240 C110,220 150,250 150,290 C150,330 110,368 70,368 C56,368 46,366 40,360 Z" />
        <path d="M240,330 C220,300 224,250 256,234 C290,218 324,244 322,276 C320,308 292,332 260,334 C250,334 244,332 240,330 Z" />
        <path d="M300,220 C282,196 286,158 310,144 C336,130 364,152 362,178 C360,204 336,222 312,224 C306,224 302,222 300,220 Z" />
      </g>
      {/* the route */}
      <path
        className="route-path--ghost"
        d="M118,342 C96,310 128,282 168,266 C216,246 116,206 128,184 C140,162 176,142 196,118 C214,96 244,92 268,84"
      />
      <path
        className="route-path"
        d="M118,342 C96,310 128,282 168,266 C216,246 116,206 128,184 C140,162 176,142 196,118 C214,96 244,92 268,84"
      />
      {/* waypoints */}
      <g>
        {dots.map((d, i) => (
          <circle
            key={i}
            className="route-dot"
            cx={d.x}
            cy={d.y}
            r={i === dots.length - 1 ? 6 : 4.5}
          />
        ))}
      </g>
      {/* start / end labels */}
      <text x="92" y="372" className="mono" fill="#829a8f" fontSize="10" letterSpacing="2">
        START
      </text>
      <text x="250" y="62" className="mono" fill="#f0641f" fontSize="10" letterSpacing="2">
        SUMMIT
      </text>
    </svg>
  );
}
