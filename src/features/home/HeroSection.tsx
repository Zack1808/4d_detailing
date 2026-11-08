import { useState } from "react";

import Tesseract from "../../components/animated/Tesseract";
import Wheel from "../../components/animated/Wheel";
import Hero from "../../components/layout/Hero";
import Button from "../../components/ui/Button";
import Reveal from "../../components/ui/Reveal";

import { BUSINESS } from "../../config/business";
import { PATHS } from "../../config/paths";
import { useIsDark } from "../../hooks/useMediaQuery";

const BACKGROUND =
  "pointer-events-none absolute top-100 right-0 -z-50 translate-x-1/2 -translate-y-3/7 opacity-15 contain-strict will-change-transform md:right-80";

export const HeroBackground = () => {
  const isDark = useIsDark();
  const [useWheel] = useState(() => Math.random() < 0.5);

  return useWheel ? (
    <Wheel
      size={1500}
      speed={100}
      isDark={isDark}
      className={`${BACKGROUND} rotate-y-180`}
    />
  ) : (
    <Tesseract
      size={1700}
      thickness={5}
      speed={70}
      isDark={isDark}
      className={`${BACKGROUND} rotate-z-180`}
    />
  );
};

const HeroSection = ({ onViewServices }: { onViewServices: () => void }) => (
  <Hero>
    <Reveal variant="left">
      <h1 className="text-5xl font-bold md:text-8xl">{BUSINESS.name}</h1>
    </Reveal>
    <Reveal variant="left" delay={200}>
      <p className="text-2xl font-normal">{BUSINESS.tagline}</p>
    </Reveal>
    <Reveal
      variant="left"
      delay={400}
      className="mt-10 flex flex-col gap-3 sm:flex-row"
    >
      <Button
        variant="secondary"
        to={PATHS.contact}
        className="order-2 sm:order-1"
      >
        Rezerviraj termin
      </Button>
      <Button
        variant="primary"
        onClick={onViewServices}
        className="order-1 sm:order-2"
      >
        Pregledaj usluge
      </Button>
    </Reveal>
  </Hero>
);

export default HeroSection;
