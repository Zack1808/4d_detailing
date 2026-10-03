import React, { useEffect } from "react";

import SEO from "@shared/components/SEO";

import Container from "@shared/components/Container";

const EMAIL = "4d.detailing.ln@gmail.com";
const OWNER = "Luka Novak";
const OIB = "17787878930";
const ADDRESS = "Rakitovec 274, 10410 Velika Gorica";
const PHONE = "+385 97 758 8716";
const CANCEL_HOURS = "[24]";
const LAST_UPDATED = "28. rujna 2026.";

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <li className="text-dark dark:text-light flex flex-col gap-3">
    <h3 className="font-semibold text-3xl">{title}</h3>
    {children}
  </li>
);

const MailLink: React.FC = () => (
  <a href={`mailto:${EMAIL}`} className="font-semibold underline">
    {EMAIL}
  </a>
);

const Terms: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <SEO
        title="Uvjeti korištenja | 4D Detailing"
        canonical="https://4d-detailing.hr/uvijeti-koristenja"
      />
      <Container>
        <h2 className="text-dark dark:text-light mt-30 text-5xl font-bold">
          Uvjeti korištenja
        </h2>
        <p className="text-dark dark:text-light mt-6 font-light">
          Molimo vas da pažljivo pročitate ove uvjete prije korištenja stranice.
          Korištenjem stranice i slanjem zahtjeva putem obrazaca prihvaćate
          sljedeće uvjete. Posljednja izmjena: {LAST_UPDATED}
        </p>

        <ul className="flex flex-col gap-12 mt-15">
          <Section title="1. Opće odredbe">
            <p className="font-light">
              Ova web stranica služi za informiranje o uslugama auto detailinga
              obrta 4D Detailing te za slanje upita i zahtjeva za termin.
            </p>
          </Section>

          <Section title="2. Podaci o pružatelju usluge">
            <p className="font-light">
              Obrt za detailing 4D Detailing, vlasnik {OWNER}, OIB: {OIB},
              sjedište: {ADDRESS}, tel: {PHONE}, e-mail: <MailLink />.
            </p>
          </Section>

          <Section title="3. Kontakt obrazac i zahtjev za termin">
            <p className="font-light">
              Putem obrasca možete poslati upit ili zatražiti termin. Slanje
              zahtjeva nije potvrda termina. Termin je dogovoren tek kada ga
              odobrimo i o tome vas obavijestimo e-poštom. Zadržavamo pravo
              odbiti zahtjev ili predložiti drugi termin. Obećavate da su podaci
              koje unosite točni i da imate pravo koristiti navedeni e-mail i
              broj telefona.
            </p>
            <p className="font-light">
              Osobne podatke obrađujemo u skladu s našim{" "}
              <a
                href="/pravila-privatnosti"
                className="font-semibold underline"
              >
                Pravilima privatnosti
              </a>
              .
            </p>
          </Section>

          <Section title="4. Otkazivanje i promjena termina">
            <p className="font-light">
              Ako ne možete doći na dogovoreni termin, molimo vas da nas o tome
              obavijestite najmanje {CANCEL_HOURS} sati unaprijed putem e-pošte
              ili telefona kako bismo termin mogli ponuditi drugim klijentima.
              Zbog opetovanih neopravdanih izostanaka zadržavamo pravo odbiti
              buduće zahtjeve za termin.
            </p>
          </Section>

          <Section title="5. Usluge i cijene">
            <p className="font-light">
              Opisi usluga i cijene na stranici informativne su naravi. Konačan
              opseg radova i cijena dogovaraju se prije početka usluge, ovisno o
              veličini i stanju vozila. Cijene su izražene u eurima.
            </p>
          </Section>

          <Section title="6. Odgovornost za vozilo">
            <p className="font-light">
              Vozilo ćemo pri preuzimanju zajedno s vama pregledati i po potrebi
              zabilježiti postojeća oštećenja. Usluge izvodimo stručno i s
              pažnjom, no ne odgovaramo za oštećenja koja su na vozilu postojala
              prije preuzimanja, kao ni za stvari ostavljene u vozilu. Ništa u
              ovim uvjetima ne isključuje niti ograničava našu odgovornost za
              namjeru ili krajnju nepažnju niti vaša prava koja vam kao
              potrošaču pripadaju po zakonu.
            </p>
          </Section>

          <Section title="7. Reklamacije">
            <p className="font-light">
              Ako niste zadovoljni izvršenom uslugom, reklamaciju možete uputiti
              na <MailLink />. Reklamacije rješavamo u skladu s Zakonom o
              zaštiti potrošača i odgovaramo u zakonskom roku.
            </p>
          </Section>

          <Section title="8. Sadržaj stranice i autorska prava">
            <p className="font-light">
              Tekstovi, fotografije, grafike i logotipi na stranici zaštićeni su
              autorskim pravom i ne smiju se kopirati, distribuirati ni
              mijenjati bez prethodnog pisanog odobrenja vlasnika. Trudimo se da
              informacije na stranici budu točne i ažurne, no ne jamčimo da su
              potpune i bez pogrešaka.
            </p>
          </Section>

          <Section title="9. Zabranjena upotreba">
            <p className="font-light">
              Zabranjeno je slanje lažnih ili neželjenih (spam) zahtjeva,
              automatizirano opterećivanje obrazaca, pokušaji neovlaštenog
              pristupa stranici ili njezinim podacima te svaka radnja koja ometa
              rad stranice. Takve pokušaje možemo prijaviti nadležnim tijelima.
            </p>
          </Section>

          <Section title="10. Kolačići">
            <p className="font-light">
              Stranica koristi nužne zapise za rad i, samo uz vašu privolu,
              analitičke kolačiće. Pojedinosti su navedene u{" "}
              <a
                href="/pravila-privatnosti"
                className="font-semibold underline"
              >
                Pravilima privatnosti
              </a>
              .
            </p>
          </Section>

          <Section title="11. Mjerodavno pravo">
            <p className="font-light">
              Na ove uvjete primjenjuje se pravo Republike Hrvatske. Za sporove
              je nadležan stvarno i mjesno nadležni sud u Republici Hrvatskoj,
              pri čemu potrošači zadržavaju sva prava koja im pripadaju po
              obveznim propisima.
            </p>
          </Section>

          <Section title="12. Izmjene uvjeta">
            <p className="font-light">
              Ove uvjete možemo izmijeniti u bilo kojem trenutku. Aktualna
              verzija uvijek je objavljena na ovoj stranici s datumom posljednje
              izmjene.
            </p>
          </Section>
        </ul>
      </Container>
    </main>
  );
};

export default Terms;
