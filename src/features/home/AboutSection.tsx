import Container from "../../components/layout/Container";
import Reveal from "../../components/ui/Reveal";
import { Paragraph, SectionTitle } from "../../components/ui/Typography";

import { BUSINESS } from "../../config/business";

const Strong = ({ children }: { children: string }) => (
  <strong className="font-semibold">{children}</strong>
);

const AboutSection = () => (
  <Container id="about">
    <div className="flex w-full flex-col justify-between gap-6 xl:flex-row">
      <div className="flex flex-col gap-6">
        <Reveal variant="left">
          <SectionTitle>Naša misija</SectionTitle>
        </Reveal>

        <Reveal variant="left">
          <Paragraph className="font-normal">
            <Strong>
              4D Detailing nastao je iz ljubavi prema automobilima i želje da tu
              strast pretvorimo u vrhunsku uslugu.
            </Strong>
          </Paragraph>
        </Reveal>
        <Reveal variant="left">
          <Paragraph>
            Ljubav prema automobilima prati nas od malih nogu. Briga o vlastitim
            vozilima, pažnja prema detaljima i zadovoljstvo koje donosi savršeno
            čist i očuvan automobil bili su početak priče koja je dovela do
            stvaranja 4D Detailing studija.
          </Paragraph>
        </Reveal>
        <Reveal variant="left">
          <Paragraph>
            Danas tu istu pažnju želimo pružiti svakom vozilu koje nam
            povjerite. Vjerujemo da detailing nije samo obično čišćenje
            automobila, već cjelovita njega kojom se čuva njegov izgled,
            kvaliteta i dugotrajnost. Zato svakom vozilu pristupamo
            individualno, temeljito i s posebnom pažnjom prema detaljima.
          </Paragraph>
        </Reveal>
        <Reveal variant="left">
          <Paragraph>
            Bilo da ste pravi zaljubljenik u automobile ili jednostavno želite
            svoje vozilo održavati urednim i očuvanim bez trošenja vlastitog
            vremena,{" "}
            <Strong>
              naš cilj je pružiti vam kvalitetu kojoj možete vjerovati.
            </Strong>
          </Paragraph>
        </Reveal>
        <Reveal variant="left">
          <Paragraph>
            Želimo profesionalnu njegu vozila približiti što većem broju ljudi i
            pokazati da kvalitetno održavanje nije nepotreban trošak, već{" "}
            <Strong>
              ulaganje u izgled, očuvanost i vrijednost vašeg automobila.
            </Strong>
          </Paragraph>
        </Reveal>
        <Reveal variant="left">
          <Paragraph>
            Svaki automobil koji izađe iz našeg studija predstavlja naš rad,
            našu reputaciju i povjerenje koje ste nam ukazali. Upravo zato
            nastojimo da rezultat uvijek bude nešto iza čega možemo ponosno
            stati.
          </Paragraph>
        </Reveal>
      </div>

      <Reveal
        transitionFrom="opacity-0 translate-y-6 xl:translate-x-6 xl:translate-y-0"
        transitionTo="opacity-100 translate-x-0 translate-y-0"
        className="mt-6 flex w-full flex-col gap-3 xl:mt-15 xl:w-3/7"
      >
        <img
          src="/images/founder.avif"
          alt="Osnivač 4D Detailinga, Luka Novak"
          className="rounded-sm object-cover"
          width={729}
          height={485}
          loading="lazy"
          decoding="async"
        />
        <small className="font-semibold italic">
          {BUSINESS.founderCaption}
        </small>
      </Reveal>
    </div>
  </Container>
);

export default AboutSection;
