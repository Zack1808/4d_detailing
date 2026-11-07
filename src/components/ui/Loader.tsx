import { useState, type ReactNode } from "react";

import Polisher from "../animated/Polisher";
import Tesseract from "../animated/Tesseract";
import Wheel from "../animated/Wheel";

import { useIsDark } from "../../hooks/useMediaQuery";

type LoaderSize = "sm" | "md" | "lg";

type LoaderProps = {
  size: LoaderSize;
  inverted?: boolean;
};

type Art = (props: { isDark: boolean }) => ReactNode;

const ARTWORK: Record<LoaderSize, Art[]> = {
  sm: [
    ({ isDark }) => (
      <Tesseract size={25} isDark={isDark} speed={3} thickness={15} />
    ),
    ({ isDark }) => <Wheel size={25} isDark={isDark} speed={2} />,
  ],
  md: [
    ({ isDark }) => (
      <Tesseract size={60} isDark={isDark} speed={10} thickness={15} />
    ),
    ({ isDark }) => <Wheel size={60} isDark={isDark} speed={3} />,
    ({ isDark }) => <Polisher size={80} isDark={isDark} speed={3} />,
  ],
  lg: [
    ({ isDark }) => (
      <Tesseract size={120} isDark={isDark} speed={5} thickness={10} />
    ),
    ({ isDark }) => <Wheel size={100} isDark={isDark} speed={2} />,
    ({ isDark }) => (
      <Polisher size={150} isDark={isDark} speed={7} className="max-h-min" />
    ),
  ],
};

/** A randomly chosen branded spinner (tesseract, wheel or polisher). */
const Loader = ({ size, inverted = false }: LoaderProps) => {
  const isDark = useIsDark();
  const [choice] = useState(() => Math.random());

  const options = ARTWORK[size];
  const Art = options[Math.floor(choice * options.length)];

  return <Art isDark={inverted ? !isDark : isDark} />;
};

export default Loader;
