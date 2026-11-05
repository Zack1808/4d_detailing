import { COLORS } from "../../config/theme";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

type PolisherProps = {
  /** Animation speed multiplier (1 = normal, 2 = double speed). */
  speed?: number;
  /** Radius of the polishing pad's orbit in SVG units (0 = no movement). */
  orbitRadius?: number;
  /** Set to false to freeze the polisher. */
  animated?: boolean;
  size?: number | string;
  className?: string;
  isDark?: boolean;
};

const EASING = "0.42 0 0.58 1";

export const Polisher = ({
  speed = 1,
  orbitRadius = 2.5,
  animated = true,
  size = 180.38,
  className,
  isDark = false,
}: PolisherProps) => {
  const reducedMotion = usePrefersReducedMotion();

  const ink = isDark ? COLORS.light : COLORS.dark;
  const paper = isDark ? COLORS.dark : COLORS.light;

  /** One orbit takes 1.2 s at speed 1. */
  const duration = `${1.2 / Math.max(speed, 0.01)}s`;
  const r = orbitRadius;
  const orbit = `0 0; ${r} 0; 0 ${r}; ${-r} 0; 0 ${-r}; 0 0`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180.38 91.83"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      overflow="visible"
      aria-hidden="true"
    >
      {/* Polishing head – the only animated part */}
      <g>
        {animated && !reducedMotion && orbitRadius > 0 && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values={orbit}
            dur={duration}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines={Array(5).fill(EASING).join(";")}
          />
        )}

        <path
          d="m121.08,89.83c-15.56,0-26.51-5.22-28.58-13.63-1.5-6.06,1.76-12.79,9.17-18.94,7.02-5.83,17.04-10.56,28.24-13.32,6.68-1.65,13.26-2.49,19.54-2.49,15.56,0,26.51,5.22,28.58,13.62,3.01,12.17-13.42,26.34-37.41,32.26-6.68,1.65-13.26,2.49-19.54,2.49Z"
          fill="none"
          stroke={paper}
          strokeMiterlimit="10"
          strokeWidth="4"
        />
        <ellipse
          cx="135.26"
          cy="65.64"
          rx="42.05"
          ry="20.35"
          transform="translate(-11.79 34.35) rotate(-13.87)"
          fill={paper}
          stroke={ink}
          strokeMiterlimit="10"
          strokeWidth="4"
        />
        <ellipse
          cx="133.77"
          cy="63.52"
          rx="35.65"
          ry="11.31"
          transform="translate(-10.95 32.14) rotate(-13.17)"
          fill="none"
          stroke={ink}
          strokeMiterlimit="10"
          strokeWidth="11"
        />
        <path
          d="m135.99,68.61c-8.62,2.29-17.02,3.4-23.66,3.12-11.75-.5-14.43-5.27-14.97-8.07-1.96-10.01,15.14-19.27,32.96-24.02,8.62-2.29,17.02-3.4,23.66-3.12,11.75.5,14.43,5.27,14.97,8.07,1.43,7.29-7.25,14.18-18.96,19.22-4.37,1.88-9.16,3.51-14,4.8Zm-3.61-18.45c-12.16,3.24-19.51,7.73-21.89,10.01,2.99.85,11.29,1.17,23.45-2.07,12.16-3.24,19.51-7.73,21.89-10.01-2.99-.85-11.29-1.17-23.45,2.07Z"
          fill={paper}
          stroke={ink}
          strokeMiterlimit="10"
          strokeWidth="2"
        />
      </g>

      {/* Fixed body */}
      <path
        d="m108.78,60.82c4.98,1.66,14.48,1.64,24.62-.97,11.16-2.88,20.33-8.04,24.14-12.37-2.24-8.2-4.48-16.39-6.72-24.59l-48.76,13.33,6.72,24.59Z"
        fill={ink}
      />
      <path
        d="m9.29,28.21l112.31,22.86c6.23-.28,10.9-2.95,17.62-6.63l26.66-14.36c3.97-5.22.55-12.76-5.99-13.22-8.38.31-14.92-.64-19.32-1.55-7.17-1.48-9.57-5.45-17.41-6.41-6.82-.83-12.79,1.78-14.56,1.88-8.93.52-30.07-.96-78.09-7.68C17.03.2,9.31,8.37,4.34,14.64c-3.93,4.95-1.25,12.31,4.95,13.58Z"
        fill={ink}
        stroke={paper}
        strokeMiterlimit="10"
        strokeWidth="5"
      />
      <path
        d="m126.49,37.45c-3.53,1.47-7.4,1.97-11.19,1.45L17.24,19.8c-3.97-.71-4.77-4.44-2.16-7.52l2.67-3.2c6.31-2.98,8.93-1.49,15.18-.65,57.31,8.42,72.72,7.45,78.39,6.03,1.45-.36,11.26-3.64,16.53-2.12,3.12.9,10.96,5.22,14.79,6.46,2.52.82,3.34,1.21,6.84,1.62,3.33.39,4.27,1.66,4.6,3.82.3,2-3.56,3.02-5.8,4.05l-21.78,9.15Z"
        fill={paper}
      />
      <path
        d="m102.54,39.5c-1.47-2.56-3.23-7.23-5.68-8.87-5.64-3.91-14.44-3.9-21.22-5.11-7.44-1.04-48.42-6.74-56.73-7.9,8.62.78,49.4,4.5,57.04,5.2,5.63.59,11.81.75,17.3,2.29,7.74,2.12,9.21,6.09,12.8,12.47,1.25,2.37-2.2,4.26-3.52,1.91Z"
        fill={ink}
      />
      <path
        d="m97.23,27.09c9.79.44,20.02-1.29,28.59-6.2,2.83-1.72,5.32-3.97,7.95-6.01-2.52,2.17-4.9,4.53-7.68,6.43-2.76,1.93-5.9,3.23-9.05,4.4-6.35,2.28-13.11,3.41-19.87,3.38-1.34-.03-1.3-2.04.06-2Z"
        fill={ink}
      />
    </svg>
  );
};

export default Polisher;
