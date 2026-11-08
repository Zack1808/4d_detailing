import SEO from "../components/seo/SEO";
import Container from "../components/layout/Container";
import Tesseract from "../components/animated/Tesseract";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";

import { PATHS } from "../config/paths";
import { useIsDark } from "../hooks/useMediaQuery";

const NotFound = () => {
  const isDark = useIsDark();

  return (
    <main className="relative flex h-screen items-center justify-center overflow-hidden">
      <SEO title="Stranica nije pronađena | 4D Detailing" noindex />
      <Tesseract
        size={1700}
        thickness={5}
        speed={70}
        isDark={isDark}
        className="pointer-events-none absolute top-100 right-0 -z-50 translate-x-1/2 -translate-y-3/7 rotate-z-180 opacity-15 md:right-80"
      />
      <Tesseract
        size={1700}
        thickness={5}
        speed={70}
        isDark={isDark}
        className="pointer-events-none absolute top-0 right-100 -z-50 hidden -translate-x-1/2 -translate-y-2/7 opacity-15 md:block"
      />

      <Container className="h-full items-center bg-light/80 dark:bg-dark/80">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <Reveal delay={200}>
            <h1 className="text-center text-6xl font-bold md:text-9xl">
              404 <br />
              <span className="mt-6 text-2xl font-semibold md:text-5xl">
                Ups... promašili ste skretanje.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-3 max-w-[75ch] text-center font-light">
              Ova stranica ne postoji, ali nema potrebe za panikom i naglim
              kočenjem.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <p className="mt-3 max-w-[75ch] text-center font-light">
              Ubacite u rikverc i vratite se na početnu.
            </p>
          </Reveal>
          <Reveal delay={500}>
            <Button variant="primary" to={PATHS.home}>
              Vrati se na početnu
            </Button>
          </Reveal>
        </div>
      </Container>
    </main>
  );
};

export default NotFound;
