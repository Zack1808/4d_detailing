import { useEffect, useRef } from "react";

import { COLORS } from "../../config/theme";

type TesseractProps = {
  size?: number | string;
  className?: string;
  /** Stroke width of the edges. */
  thickness?: number;
  /** Higher = slower (one loop takes `speed` seconds). */
  speed?: number;
  isDark?: boolean;
};

type Point3D = { x: number; y: number; z: number };

const LOOP_MS = 1000;

// 16 vertices of a tesseract: (±1, ±1, ±1, ±1)
const VERTICES: number[][] = Array.from({ length: 16 }, (_, i) => [
  i & 1 ? 1 : -1,
  i & 2 ? 1 : -1,
  i & 4 ? 1 : -1,
  i & 8 ? 1 : -1,
]);

// 32 edges: vertex pairs that differ in exactly one coordinate.
const EDGES: [number, number][] = [];

for (let i = 0; i < 16; i++) {
  for (let bit = 0; bit < 4; bit++) {
    const j = i ^ (1 << bit);

    if (i < j) EDGES.push([i, j]);
  }
}

/** Rotates coordinates `a` and `b` of `p` in place. */
const rotate = (p: number[], a: number, b: number, angle: number) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const x = p[a];
  const y = p[b];

  p[a] = x * cos - y * sin;
  p[b] = x * sin + y * cos;
};

const project = (vertex: number[], phase: number): Point3D => {
  const p = vertex.slice();
  const t = phase * Math.PI * 2;

  // Double 4D rotation
  rotate(p, 0, 3, 0.68 + t);
  rotate(p, 1, 2, t);

  // 4D perspective projection
  const wScale = 4 / (4 - 0.6 * p[3]);
  const q = [p[0] * wScale, p[1] * wScale, p[2] * wScale];

  // Fixed camera orientation
  rotate(q, 0, 2, -0.72);
  rotate(q, 1, 2, 0.48);
  rotate(q, 0, 1, 0.02);

  // Conventional 3D perspective
  const perspective = 6 / (6 - 0.2 * q[2]);

  return {
    x: q[0] * perspective * 55 + 128,
    y: q[1] * perspective * 55 + 128,
    z: q[2],
  };
};

export const Tesseract = ({
  size = 256,
  className,
  thickness = 1,
  speed = 1,
  isDark = false,
}: TesseractProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);

  const duration = LOOP_MS * speed;

  useEffect(() => {
    const svg = svgRef.current;
    const paths = groupRef.current?.querySelectorAll("path");

    if (!svg || !paths) return;

    const draw = (phase: number) => {
      const points = VERTICES.map((vertex) => project(vertex, phase));

      // Painter's algorithm: far edges first, near edges last.
      EDGES.map((edge) => ({
        edge,
        z: (points[edge[0]].z + points[edge[1]].z) / 2,
      }))
        .sort((a, b) => a.z - b.z)
        .forEach(({ edge }, index) => {
          const a = points[edge[0]];
          const b = points[edge[1]];

          paths[index].setAttribute(
            "d",
            `M${a.x.toFixed(2)} ${a.y.toFixed(2)}L${b.x.toFixed(2)} ${b.y.toFixed(2)}`,
          );
        });
    };

    // Always paint one frame so the shape is visible even without animation.
    draw(0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frameId: number | null = null;
    let onScreen = false;
    let tabActive = document.visibilityState === "visible";

    const tick = (ms: number) => {
      draw((ms % duration) / duration);
      frameId = requestAnimationFrame(tick);
    };

    const sync = () => {
      const shouldRun = onScreen && tabActive;

      if (shouldRun && frameId === null) {
        frameId = requestAnimationFrame(tick);
      } else if (!shouldRun && frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    // Only spend CPU while the shape is on screen and the tab is in front.
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });

    const handleVisibility = () => {
      tabActive = document.visibilityState === "visible";
      sync();
    };

    observer.observe(svg);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);

      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [duration]);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <g
        ref={groupRef}
        fill="none"
        stroke={isDark ? COLORS.light : COLORS.dark}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeLinejoin="miter"
      >
        {EDGES.map(([a, b]) => (
          <path key={`${a}-${b}`} />
        ))}
      </g>
    </svg>
  );
};

export default Tesseract;
