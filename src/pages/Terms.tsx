import {
  InlineLink,
  LegalPage,
  LegalSection,
  LegalText,
  MailLink,
} from "../components/legal/LegalPage";

import { BUSINESS } from "../config/business";
import { PATHS } from "../config/paths";
import { PAGE_META } from "../config/seo";

const LAST_UPDATED = "28. rujna 2026.";

/** Shown to visitors – the original had a literal "[24]" placeholder here. */
const CANCEL_HOURS = "24";

const Terms = () => (
  <LegalPage
    meta={PAGE_META.terms}
    title="Uvjeti korištenja"
    intro={`Molimo vas da pažljivo pročitate ove uvjete prije korištenja stranice. Korištenjem stranice i slanjem zahtjeva putem obrazaca prihvaćate sljedeće uvjete. Posljednja izmjena: ${LAST_UPDATED}`}
  >
    <LegalSection title="1. Opće odredbe">
      <LegalText>
        Ova web stranica služi za informiranje o uslugama auto detailinga obrta{" "}
        {BUSINESS.name} te za slanje upita i zahtjeva za termin.
      </LegalText>
    </LegalSection>

    <LegalSection title="2. Podaci o pružatelju usluge">
      <LegalText>
        Obrt za detailing {BUSINESS.name}, vlasnik {BUSINESS.owner}, OIB:{" "}
        {BUSINESS.oib}, sjedište: {BUSINESS.address.full}, tel:{" "}
        {BUSINESS.phone.display}, e-mail: <MailLink />.
      </LegalText>
    </LegalSection>

    <LegalSection title="3. Kontakt obrazac i zahtjev za termin">
      <LegalText>
        Putem obrasca možete poslati upit ili zatražiti termin. Slanje zahtjeva
        nije potvrda termina. Termin je dogovoren tek kada ga odobrimo i o tome
        vas obavijestimo e-poštom. Zadržavamo pravo odbiti zahtjev ili
        predložiti drugi termin. Obećavate da su podaci koje unosite točni i da
        imate pravo koristiti navedeni e-mail i broj telefona.
      </LegalText>
      <LegalText>
        Osobne podatke obrađujemo u skladu s našim{" "}
        <InlineLink href={PATHS.privacy}>Pravilima privatnosti</InlineLink>.
      </LegalText>
    </LegalSection>

    <LegalSection title="4. Otkazivanje i promjena termina">
      <LegalText>
        Ako ne možete doći na dogovoreni termin, molimo vas da nas o tome
        obavijestite najmanje {CANCEL_HOURS} sati unaprijed putem e-pošte ili
        telefona kako bismo termin mogli ponuditi drugim klijentima. Zbog
        opetovanih neopravdanih izostanaka zadržavamo pravo odbiti buduće
        zahtjeve za termin.
      </LegalText>
    </LegalSection>

    <LegalSection title="5. Usluge i cijene">
      <LegalText>
        Opisi usluga i cijene na stranici informativne su naravi. Konačan opseg
        radova i cijena dogovaraju se prije početka usluge, ovisno o veličini i
        stanju vozila. Cijene su izražene u eurima.
      </LegalText>
    </LegalSection>

    <LegalSection title="6. Odgovornost za vozilo">
      <LegalText>
        Vozilo ćemo pri preuzimanju zajedno s vama pregledati i po potrebi
        zabilježiti postojeća oštećenja. Usluge izvodimo stručno i s pažnjom, no
        ne odgovaramo za oštećenja koja su na vozilu postojala prije
        preuzimanja, kao ni za stvari ostavljene u vozilu. Ništa u ovim uvjetima
        ne isključuje niti ograničava našu odgovornost za namjeru ili krajnju
        nepažnju niti vaša prava koja vam kao potrošaču pripadaju po zakonu.
      </LegalText>
    </LegalSection>

    <LegalSection title="7. Reklamacije">
      <LegalText>
        Ako niste zadovoljni izvršenom uslugom, reklamaciju možete uputiti na{" "}
        <MailLink />. Reklamacije rješavamo u skladu s Zakonom o zaštiti
        potrošača i odgovaramo u zakonskom roku.
      </LegalText>
    </LegalSection>

    <LegalSection title="8. Sadržaj stranice i autorska prava">
      <LegalText>
        Tekstovi, fotografije, grafike i logotipi na stranici zaštićeni su
        autorskim pravom i ne smiju se kopirati, distribuirati ni mijenjati bez
        prethodnog pisanog odobrenja vlasnika. Trudimo se da informacije na
        stranici budu točne i ažurne, no ne jamčimo da su potpune i bez
        pogrešaka.
      </LegalText>
    </LegalSection>

    <LegalSection title="9. Zabranjena upotreba">
      <LegalText>
        Zabranjeno je slanje lažnih ili neželjenih (spam) zahtjeva,
        automatizirano opterećivanje obrazaca, pokušaji neovlaštenog pristupa
        stranici ili njezinim podacima te svaka radnja koja ometa rad stranice.
        Takve pokušaje možemo prijaviti nadležnim tijelima.
      </LegalText>
    </LegalSection>

    <LegalSection title="10. Kolačići">
      <LegalText>
        Stranica koristi nužne zapise za rad i, samo uz vašu privolu, analitičke
        kolačiće. Pojedinosti su navedene u{" "}
        <InlineLink href={PATHS.privacy}>Pravilima privatnosti</InlineLink>.
      </LegalText>
    </LegalSection>

    <LegalSection title="11. Mjerodavno pravo">
      <LegalText>
        Na ove uvjete primjenjuje se pravo Republike Hrvatske. Za sporove je
        nadležan stvarno i mjesno nadležni sud u Republici Hrvatskoj, pri čemu
        potrošači zadržavaju sva prava koja im pripadaju po obveznim propisima.
      </LegalText>
    </LegalSection>

    <LegalSection title="12. Izmjene uvjeta">
      <LegalText>
        Ove uvjete možemo izmijeniti u bilo kojem trenutku. Aktualna verzija
        uvijek je objavljena na ovoj stranici s datumom posljednje izmjene.
      </LegalText>
    </LegalSection>
  </LegalPage>
);

export default Terms;
