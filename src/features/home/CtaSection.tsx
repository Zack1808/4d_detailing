import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import Logo from "../../components/ui/Logo";
import Reveal from "../../components/ui/Reveal";
import { Paragraph } from "../../components/ui/Typography";

import { PATHS } from "../../config/paths";

const CtaSection = () => (
  <Container id="cta-contact">
    <div className="mt-3 flex w-full flex-col justify-between gap-6 md:flex-row md:items-center">
      <div className="flex flex-col gap-3">
        <Reveal variant="left">
          <h2 className="text-4xl font-bold">
            Vaš automobil zaslužuje više od običnog čišćenja.
          </h2>
        </Reveal>
        <Reveal variant="left">
          <Paragraph className="mt-3">
            Detalji čine razliku. Od dubinskog čišćenja do poliranja i zaštite,
            u 4D Detailingu svakom vozilu pristupamo s istom pažnjom kao da je
            naše vlastito.
          </Paragraph>
        </Reveal>
        <Reveal variant="left">
          <Paragraph className="mt-3">
            Dopustite nam da vratimo vašem automobilu svježinu, sjaj i osjećaj
            novog.
          </Paragraph>
        </Reveal>
        <Reveal variant="left">
          <Paragraph className="mt-3">
            Niste sigurni što je potrebno vašem vozilu? Javite nam se — rado
            ćemo vam preporučiti najbolju opciju.
          </Paragraph>
        </Reveal>
        <Reveal variant="left">
          <Paragraph className="mt-3">
            Rezervirajte svoj termin i prepustite svoje vozilo u naše ruke.
          </Paragraph>
        </Reveal>
        <Reveal variant="left">
          <Button variant="primary" to={PATHS.contact} className="mt-6">
            Rezerviraj termin
          </Button>
        </Reveal>
      </div>

      <Logo
        width={567}
        height={495}
        loading="lazy"
        className="hidden w-1/3 md:flex"
      />
    </div>
  </Container>
);

export default CtaSection;
