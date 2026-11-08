import { useRef } from "react";

import SEO from "../components/seo/SEO";
import AboutSection from "../features/home/AboutSection";
import CtaSection from "../features/home/CtaSection";
import FeaturedServices from "../features/home/FeaturedServices";
import HeroSection, { HeroBackground } from "../features/home/HeroSection";
import ReviewsSection from "../features/home/ReviewsSection";

import { PAGE_META } from "../config/seo";
import { generateAutoWashSchema } from "../utils/schema";

const schema = generateAutoWashSchema();

const Home = () => {
  const servicesRef = useRef<HTMLElement>(null);

  return (
    <main className="relative overflow-hidden">
      <HeroBackground />
      <SEO {...PAGE_META.home} schema={schema} />

      <HeroSection
        onViewServices={() =>
          servicesRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <FeaturedServices ref={servicesRef} />
      <AboutSection />
      <ReviewsSection />
      <CtaSection />
    </main>
  );
};

export default Home;
