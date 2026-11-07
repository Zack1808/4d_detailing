import { FaClock, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import { Paragraph } from "../../components/ui/Typography";
import Reveal from "../../components/ui/Reveal";

import { BUSINESS } from "../../config/business";

const ROW = "gap-3 text-base";

/** Left column of the contact page: intro text, contact details and map. */
const ContactDetails = () => (
  <div className="flex min-h-0 flex-1 flex-col gap-3">
    <div className="flex flex-col gap-3">
      <Reveal variant="left" delay={300}>
        <Paragraph>
          Želite svom vozilu pružiti pažnju koju zaslužuje? Ispunite obrazac i
          pošaljite nam upit za termin, a mi ćemo vam se javiti kako bismo
          dogovorili sve detalje.
        </Paragraph>
      </Reveal>
      <Reveal variant="left" delay={400}>
        <Paragraph>
          Niste sigurni koja je usluga najbolji izbor za vaše vozilo? Slobodno
          nam se obratite – rado ćemo odgovoriti na vaša pitanja i preporučiti
          opciju koja najbolje odgovara vašim potrebama.
        </Paragraph>
      </Reveal>
      <Reveal variant="left" delay={500}>
        <Paragraph>
          Ako vam je jednostavnije, možete nas kontaktirati telefonom ili
          e-mailom. Za rezervaciju termina možete koristiti i obrazac u
          nastavku.
        </Paragraph>
      </Reveal>
    </div>

    <ul className="mt-3">
      <li>
        <Reveal variant="left" delay={600}>
          <Button
            variant="link"
            className={ROW}
            href={`mailto:${BUSINESS.email}`}
          >
            <FaEnvelope className="text-lg" aria-hidden="true" />
            Email: {BUSINESS.email}
          </Button>
        </Reveal>
      </li>
      <li>
        <Reveal variant="left" delay={700}>
          <Button variant="link" className={ROW} href={BUSINESS.phone.href}>
            <FaPhone className="text-lg" aria-hidden="true" />
            Telefon: {BUSINESS.phone.display}
          </Button>
        </Reveal>
      </li>
      <li>
        <Reveal
          variant="left"
          delay={800}
          className="flex items-center gap-3 py-3 font-medium"
        >
          <FaClock className="text-lg" aria-hidden="true" />
          Radno vrijeme: Po dogovoru
        </Reveal>
      </li>
      <li>
        <Reveal variant="left" delay={900}>
          <Button
            variant="link"
            className={ROW}
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLocationDot className="text-lg" aria-hidden="true" />
            Lokacija sjedišta: {BUSINESS.address.full}
          </Button>
        </Reveal>
      </li>
    </ul>

    <Reveal
      delay={1000}
      transitionFrom="opacity-0 translate-y-6 lg:translate-y-0 lg:-translate-x-6"
      transitionTo="opacity-100 translate-x-0 translate-y-0"
      className="group relative min-h-0 overflow-hidden rounded-xs lg:mb-18.5 lg:flex-1"
    >
      <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center gap-3 bg-gray-light/20 font-semibold dark:bg-gray-dark/20">
        <Loader size="md" />
        Učitavanje karte...
      </div>

      <iframe
        src={BUSINESS.mapsEmbedUrl}
        loading="lazy"
        title={`Karta lokacije, ${BUSINESS.address.full}`}
        className="h-full min-h-60 w-full"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div className="pointer-events-none absolute inset-0 rounded-xs bg-black/0 transition-colors duration-200 group-hover:bg-dark/30" />
    </Reveal>
  </div>
);

export default ContactDetails;
