import { useEffect, useId, useRef } from "react";

type Point3D = {
  x: number;
  y: number;
  z: number;
};

type TesseractProps = {
  size: number | string;
  className?: string;
  thickness?: number;
  speed?: number;
  isDark?: boolean;
};

const LOOP = 1000;

// 16 vertices of a tesseract: (±1, ±1, ±1, ±1)
const V: number[][] = [];

for (let i = 0; i < 16; i++) {
  V.push([i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1, i & 8 ? 1 : -1]);
}

// 32 edges: vertices differing in exactly one coordinate.
const E: [number, number][] = [];

for (let i = 0; i < 16; i++) {
  for (let b = 0; b < 4; b++) {
    const j = i ^ (1 << b);

    if (i < j) {
      E.push([i, j]);
    }
  }
}

function rotate4(p: number[], a: number, b: number, angle: number): void {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  const x = p[a];
  const y = p[b];

  p[a] = x * c - y * s;
  p[b] = x * s + y * c;
}

function rotate3(p: number[], a: number, b: number, angle: number): void {
  const c = Math.cos(angle);
  const s = Math.sin(angle);

  const x = p[a];
  const y = p[b];

  p[a] = x * c - y * s;
  p[b] = x * s + y * c;
}

function project(vertex: number[], phase: number): Point3D {
  const p = vertex.slice();

  const t = phase * Math.PI * 2;

  // Double 4D rotation
  rotate4(p, 0, 3, 0.68 + t);
  rotate4(p, 1, 2, t);

  // 4D perspective projection
  const wCamera = 4.0;
  const wScale = wCamera / (wCamera - 0.6 * p[3]);

  const q = [p[0] * wScale, p[1] * wScale, p[2] * wScale];

  // Fixed camera orientation
  rotate3(q, 0, 2, -0.72);
  rotate3(q, 1, 2, 0.48);
  rotate3(q, 0, 1, 0.02);

  // Conventional 3D perspective
  const camera = 6.0;
  const perspective = camera / (camera - 0.2 * q[2]);

  return {
    x: q[0] * perspective * 55 + 128,
    y: q[1] * perspective * 55 + 128,
    z: q[2],
  };
}

function pathFor(a: Point3D, b: Point3D): string {
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)}
          L ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

const Tesseract = ({
  size = 256,
  className,
  thickness = 1,
  speed = 1,
  isDark = false,
}: TesseractProps) => {
  const duration = LOOP * speed;

  const auraRef = useRef<SVGGElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const edgesRef = useRef<SVGGElement>(null);
  const shineRef = useRef<SVGGElement>(null);

  const darkColor = "#111416";
  const lightColor = "#fafafa";

  // Makes SVG IDs unique if you render multiple tesseracts.
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const aura = auraRef.current;
    const body = bodyRef.current;
    const edges = edgesRef.current;
    const shine = shineRef.current;

    if (!aura || !body || !edges || !shine) {
      return;
    }

    const auraPaths = Array.from(aura.querySelectorAll<SVGPathElement>("path"));

    const bodyPaths = Array.from(body.querySelectorAll<SVGPathElement>("path"));

    const edgePaths = Array.from(
      edges.querySelectorAll<SVGPathElement>("path"),
    );

    const shinePaths = Array.from(
      shine.querySelectorAll<SVGPathElement>("path"),
    );

    let animationFrameId: number;

    const animate = (ms: number) => {
      const phase = (ms % duration) / duration;

      const points = V.map((vertex) => project(vertex, phase));

      /*
       * Painter's algorithm:
       * farther edges first, nearer edges last.
       */
      const sorted = E.map((edge) => ({
        edge,
        z: (points[edge[0]].z + points[edge[1]].z) / 2,
      })).sort((a, b) => a.z - b.z);

      sorted.forEach(({ edge }, index) => {
        const a = points[edge[0]];
        const b = points[edge[1]];

        const d = pathFor(a, b);

        auraPaths[index].setAttribute("d", d);
        bodyPaths[index].setAttribute("d", d);
        edgePaths[index].setAttribute("d", d);
        shinePaths[index].setAttribute("d", d);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      className={className}
      aria-label="Rotating tesseract"
      role="img"
    >
      <defs>
        <filter
          id={`${id}-wideGlow`}
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
        >
          <feGaussianBlur stdDeviation="5.5" />
        </filter>
      </defs>

      {/* Blue aura */}
      <g
        ref={auraRef}
        fill="none"
        strokeWidth="8"
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity="0.18"
        filter={`url(#${id}-wideGlow)`}
      >
        {E.map((_, index) => (
          <path key={`aura-${index}`} />
        ))}
      </g>

      {/* Main glossy body */}
      <g
        ref={bodyRef}
        stroke={`url(#${id}-tube)`}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${id}-blueGlow)`}
      >
        {E.map((_, index) => (
          <path key={`body-${index}`} />
        ))}
      </g>

      {/* Dark outer edge */}
      <g
        ref={edgesRef}
        fill="none"
        stroke={isDark ? lightColor : darkColor}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeLinejoin="miter"
      >
        {E.map((_, index) => (
          <path key={`edge-${index}`} />
        ))}
      </g>

      {/* Specular highlight */}
      <g
        ref={shineRef}
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      >
        {E.map((_, index) => (
          <path key={`shine-${index}`} />
        ))}
      </g>
    </svg>
  );
};

export default Tesseract;
