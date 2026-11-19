import { useRef } from "react";

import SEO from "../components/seo/SEO";
import AboutSection from "../features/home/AboutSection";
import CtaSection from "../features/home/CtaSection";
import FeaturedServices from "../features/home/FeaturedServices";
import HeroSection, { HeroBackground } from "../features/home/HeroSection";
import ReviewsSection from "../features/home/ReviewsSection";

import { PAGE_META } from "../config/seo";
import { generateBusinessSchema, generateWebsiteSchema } from "../utils/schema";

const schema = [generateBusinessSchema(), generateWebsiteSchema()];

const Home = () => {
  const servicesRef = useRef<HTMLElement>(null);

  return (
    <main id="main" tabIndex={-1} className="relative overflow-hidden">
      <HeroBackground />
      <SEO {...PAGE_META.home} schema={schema} />

      <HeroSection
        onViewServices={() => {
          servicesRef.current?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          });
          servicesRef.current?.focus({ preventScroll: true });
        }}
      />
      <FeaturedServices ref={servicesRef} />
      <AboutSection />
      <ReviewsSection />
      <CtaSection />
    </main>
  );
};

export default Home;
