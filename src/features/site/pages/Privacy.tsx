import React, { useEffect } from "react";

import List from "@shared/components/List";
import SEO from "@shared/components/SEO";

import Container from "@shared/components/Container";

import { useTheme } from "@/shared/context/ThemeContext";

const EMAIL = "4d.detailing.ln@gmail.com";
const OWNER = "Luka Novak";
const OIB = "17787878930";
const ADDRESS = "Rakitovec 274, 10410 Velika Gorica";
const PHONE = "+385 97 758 8716";
const LAST_UPDATED = "28. rujna 2026.";

const FORM_DATA = [
  "Ime i prezime",
  "Email adresa",
  "Broj telefona",
  "Predmet maila",
  "Marka vozila",
  "Željeni termin",
  "Napomena koju nam šaljete",
];

const TECH_DATA = [
  "IP adresu, vrstu preglednika i operativnog sustava te vrijeme pristupa (tehnički zapisi poslužitelja kod pružatelja hostinga)",
];

const ANALYTICS_DATA = [
  "Stranice koje posjećujete i trajanje posjete",
  "Vrstu uređaja, preglednika i operativnog sustava",
  "Približnu lokaciju (na razini grada/države) i identifikator kolačića",
];

const PURPOSES = [
  "Odgovaranje na vaše upite i zahtjeve za termin – pravna osnova: poduzimanje radnji na vaš zahtjev prije sklapanja ugovora (čl. 6. st. 1. t. b GDPR-a) te naš legitimni interes za odgovaranje na upite (čl. 6. st. 1. t. f GDPR-a).",
  "Odobravanje ili odbijanje termina i slanje obavijesti o terminu e-poštom – pravna osnova: čl. 6. st. 1. t. b GDPR-a.",
  "Izvršenje usluge i ispunjenje zakonskih obveza (npr. računovodstvenih propisa) – pravna osnova: čl. 6. st. 1. t. b i c GDPR-a.",
  "Analiza posjećenosti i poboljšanje stranice putem Google Analyticsa – pravna osnova: vaša privola (čl. 6. st. 1. t. a GDPR-a), koju možete povući u bilo kojem trenutku.",
  "Sigurnost stranice i sprječavanje zlouporaba – pravna osnova: legitimni interes (čl. 6. st. 1. t. f GDPR-a).",
];

const PROCESSORS = [
  "Google Firebase (Google Ireland Limited / Google LLC) – pohrana zahtjeva za termin i podataka iz obrasca",
  "EmailJS – slanje automatskih e-mail poruka putem obrasca",
  "Google (Gmail) – primanje i pohrana e-mail poruka koje nam šaljete ili primamo putem obrasca",
  "Netlify, Inc. – hosting web stranice",
  "Google Analytics (Google Ireland Limited / Google LLC) – analitika posjećenosti, samo uz vašu privolu",
];

const RIGHTS = [
  "pravo na pristup vašim osobnim podacima",
  "pravo na ispravak netočnih podataka",
  "pravo na brisanje (\u201Epravo na zaborav\u201C)",
  "pravo na ograničenje obrade",
  "pravo na prenosivost podataka",
  "pravo na prigovor na obradu koja se temelji na legitimnom interesu",
  "pravo na povlačenje privole u bilo kojem trenutku, bez utjecaja na zakonitost obrade prije povlačenja",
];

const COOKIES = [
  "Nužni zapisi za rad stranice (npr. pamćenje odabira teme i vaše odluke o kolačićima) – ne zahtijevaju privolu.",
  "Analitički kolačići Google Analyticsa (_ga, _ga_*) – postavljaju se tek nakon što ih prihvatite putem obavijesti o kolačićima.",
];

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <li className="text-dark dark:text-light flex flex-col gap-3">
      <h3 className="font-semibold text-3xl">{title}</h3>
      {children}
    </li>
  );
};

const MailLink: React.FC = () => (
  <a href={`mailto:${EMAIL}`} className="font-semibold underline">
    {EMAIL}
  </a>
);

const Privacy: React.FC = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <SEO
        title="Pravila privatnosti | 4D Detailing"
        canonical="https://4d-detailing.hr/pravila-privatnosti"
      />
      <Container>
        <h2 className="text-dark dark:text-light mt-30 text-5xl font-bold">
          Pravila privatnosti
        </h2>
        <p className="text-dark dark:text-light mt-6 font-light">
          Posljednja izmjena: {LAST_UPDATED}
        </p>

        <ul className="flex flex-col gap-12 mt-15">
          <Section title="1. Voditelj obrade">
            <p className="font-light">
              Voditelj obrade vaših osobnih podataka je obrt za detailing 4D
              Detailing, vlasnik {OWNER}, OIB: {OIB}, sjedište: {ADDRESS}, tel:{" "}
              {PHONE}, e-mail: <MailLink />.
            </p>
          </Section>

          <Section title="2. Podaci koje prikupljamo">
            <p className="font-light">
              Podatke koje dobrovoljno unesete putem kontakt obrasca i obrasca
              za zahtjev za termin:
            </p>
            <List list={FORM_DATA} isDark={isDark} inset />
            <p className="font-light">
              Podatke koji se automatski bilježe pri posjetu stranici:
            </p>
            <List list={TECH_DATA} isDark={isDark} inset />
            <p className="font-light">
              Samo ako pristanete na analitičke kolačiće, putem Google
              Analyticsa prikupljamo i:
            </p>
            <List list={ANALYTICS_DATA} isDark={isDark} inset />
            <p className="font-light">
              Ovi se podaci smatraju osobnim podacima jer se mogu povezati s
              pojedinim uređajem ili korisnikom.
            </p>
          </Section>

          <Section title="3. Svrhe obrade i pravna osnova">
            <List list={PURPOSES} isDark={isDark} inset />
            <p className="font-light">
              Podaci koje unosite u obrazac potrebni su za obradu vašeg upita
              ili zahtjeva. Bez njih ne možemo odgovoriti na upit niti potvrditi
              termin.
            </p>
          </Section>

          <Section title="4. Primatelji podataka">
            <p className="font-light">
              Vaše osobne podatke ne prodajemo niti ih ustupamo trećim stranama
              u marketinške svrhe. Za rad stranice koristimo pouzdane pružatelje
              usluga koji podatke obrađuju u naše ime i prema našim uputama:
            </p>
            <List list={PROCESSORS} isDark={isDark} inset />
            <p className="font-light">
              Podaci mogu biti otkriveni i tijelima javne vlasti ako nas na to
              obvezuje zakon.
            </p>
          </Section>

          <Section title="5. Prijenos podataka izvan EGP-a">
            <p className="font-light">
              Neki od navedenih pružatelja usluga mogu obrađivati podatke i
              izvan Europskoga gospodarskog prostora, uključujući SAD. U tom se
              slučaju prijenos temelji na odgovarajućim zaštitnim mjerama, kao
              što su standardne ugovorne klauzule Europske komisije ili odluka o
              primjerenosti (Okvir za privatnost podataka EU-SAD).
            </p>
          </Section>

          <Section title="6. Rok čuvanja">
            <p className="font-light">
              Upite i zahtjeve za termin čuvamo najdulje 12 mjeseci od
              posljednje komunikacije. Podatke potrebne za izvršenu uslugu i
              izdavanje računa čuvamo onoliko koliko nalažu računovodstveni i
              porezni propisi. Podaci Google Analyticsa čuvaju se u razdoblju
              određenom postavkama našeg Analytics računa. Nakon isteka roka
              podatke brišemo ili trajno anonimiziramo.
            </p>
          </Section>

          <Section title="7. Kolačići">
            <p className="font-light">Naša stranica koristi:</p>
            <List list={COOKIES} isDark={isDark} inset />
            <p className="font-light">
              Analitiku pokrećemo tek nakon vaše privole. Privolu možete povući
              ili promijeniti u bilo kojem trenutku putem obavijesti o
              kolačićima na stranici, a kolačiće možete i obrisati ili
              onemogućiti u postavkama preglednika. Više o Googleovim kolačićima
              možete saznati na{" "}
              <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                službenim Google stranicama
              </a>
              .
            </p>
          </Section>

          <Section title="8. Sigurnost podataka">
            <p className="font-light">
              Primjenjujemo odgovarajuće tehničke i organizacijske mjere
              zaštite, među ostalim šifriranu (HTTPS) komunikaciju, ograničen
              pristup podacima samo ovlaštenim osobama i zaštićen
              administratorski pristup. Ipak, nijedna metoda prijenosa ili
              pohrane podataka putem interneta nije potpuno sigurna.
            </p>
          </Section>

          <Section title="9. Vaša prava">
            <p className="font-light">U vezi s vašim osobnim podacima imate:</p>
            <List list={RIGHTS} isDark={isDark} inset />
            <p className="font-light">
              Prava možete ostvariti slanjem zahtjeva na <MailLink />. Na
              zahtjev odgovaramo u roku od mjesec dana. Ako smatrate da obrada
              vaših podataka krši propise, imate pravo podnijeti pritužbu
              nadzornom tijelu: Agenciji za zaštitu osobnih podataka (AZOP),
              Selska cesta 136, Zagreb,{" "}
              <a
                href="https://azop.hr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                azop.hr
              </a>
              .
            </p>
          </Section>

          <Section title="10. Izmjene pravila privatnosti">
            <p className="font-light">
              Ova pravila možemo povremeno izmijeniti, primjerice zbog promjene
              zakona ili naših usluga. Aktualna verzija uvijek je objavljena na
              ovoj stranici s datumom posljednje izmjene.
            </p>
          </Section>

          <Section title="11. Kontakt">
            <p className="font-light">
              Za sva pitanja o obradi osobnih podataka javite nam se na{" "}
              <MailLink /> ili putem kontakt obrasca na našoj web stranici.
            </p>
          </Section>
        </ul>
      </Container>
    </main>
  );
};

export default Privacy;
