import {
  InlineLink,
  LegalPage,
  LegalSection,
  LegalText,
  MailLink,
} from "../components/legal/LegalPage";
import List from "../components/ui/List";

import { BUSINESS } from "../config/business";
import { PAGE_META } from "../config/seo";

const LAST_UPDATED = "5. studenoga 2026.";

const FORM_DATA = [
  "Ime i prezime",
  "Email adresa",
  "Broj telefona",
  "Odabrana usluga",
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
  "Mailgun (Mailgun Technologies, Inc.) – slanje automatskih e-mail poruka putem obrasca",
  "Google (Gmail) – primanje i pohrana e-mail poruka koje nam šaljete ili primamo putem obrasca",
  "Netlify, Inc. – hosting web stranice",
  "Google Analytics (Google Ireland Limited / Google LLC) – analitika posjećenosti, samo uz vašu privolu",
];

const RIGHTS = [
  "pravo na pristup vašim osobnim podacima",
  "pravo na ispravak netočnih podataka",
  "pravo na brisanje („pravo na zaborav“)",
  "pravo na ograničenje obrade",
  "pravo na prenosivost podataka",
  "pravo na prigovor na obradu koja se temelji na legitimnom interesu",
  "pravo na povlačenje privole u bilo kojem trenutku, bez utjecaja na zakonitost obrade prije povlačenja",
];

const COOKIES = [
  "Nužni zapisi za rad stranice (npr. pamćenje odabira teme i vaše odluke o kolačićima) – ne zahtijevaju privolu.",
  "Analitički kolačići Google Analyticsa (_ga, _ga_*) – postavljaju se tek nakon što ih prihvatite putem obavijesti o kolačićima.",
];

const Privacy = () => (
  <LegalPage
    meta={PAGE_META.privacy}
    title="Pravila privatnosti"
    intro={`Posljednja izmjena: ${LAST_UPDATED}`}
  >
    <LegalSection title="1. Voditelj obrade">
      <LegalText>
        Voditelj obrade vaših osobnih podataka je obrt za detailing{" "}
        {BUSINESS.name}, vlasnik {BUSINESS.owner}, OIB: {BUSINESS.oib},
        sjedište: {BUSINESS.address.full}, tel: {BUSINESS.phone.display},
        e-mail: <MailLink />.
      </LegalText>
    </LegalSection>

    <LegalSection title="2. Podaci koje prikupljamo">
      <LegalText>
        Podatke koje dobrovoljno unesete putem kontakt obrasca i obrasca za
        zahtjev za termin:
      </LegalText>
      <List items={FORM_DATA} inset />
      <LegalText>
        Podatke koji se automatski bilježe pri posjetu stranici:
      </LegalText>
      <List items={TECH_DATA} inset />
      <LegalText>
        Samo ako pristanete na analitičke kolačiće, putem Google Analyticsa
        prikupljamo i:
      </LegalText>
      <List items={ANALYTICS_DATA} inset />
      <LegalText>
        Ovi se podaci smatraju osobnim podacima jer se mogu povezati s pojedinim
        uređajem ili korisnikom.
      </LegalText>
    </LegalSection>

    <LegalSection title="3. Svrhe obrade i pravna osnova">
      <List items={PURPOSES} inset />
      <LegalText>
        Podaci koje unosite u obrazac potrebni su za obradu vašeg upita ili
        zahtjeva. Bez njih ne možemo odgovoriti na upit niti potvrditi termin.
      </LegalText>
    </LegalSection>

    <LegalSection title="4. Primatelji podataka">
      <LegalText>
        Vaše osobne podatke ne prodajemo niti ih ustupamo trećim stranama u
        marketinške svrhe. Za rad stranice koristimo pouzdane pružatelje usluga
        koji podatke obrađuju u naše ime i prema našim uputama:
      </LegalText>
      <List items={PROCESSORS} inset />
      <LegalText>
        Podaci mogu biti otkriveni i tijelima javne vlasti ako nas na to
        obvezuje zakon.
      </LegalText>
    </LegalSection>

    <LegalSection title="5. Prijenos podataka izvan EGP-a">
      <LegalText>
        Neki od navedenih pružatelja usluga mogu obrađivati podatke i izvan
        Europskoga gospodarskog prostora, uključujući SAD. U tom se slučaju
        prijenos temelji na odgovarajućim zaštitnim mjerama, kao što su
        standardne ugovorne klauzule Europske komisije ili odluka o
        primjerenosti (Okvir za privatnost podataka EU-SAD).
      </LegalText>
    </LegalSection>

    <LegalSection title="6. Rok čuvanja">
      <LegalText>
        Upite i zahtjeve za termin čuvamo najdulje 12 mjeseci od posljednje
        komunikacije. Podatke potrebne za izvršenu uslugu i izdavanje računa
        čuvamo onoliko koliko nalažu računovodstveni i porezni propisi. Podaci
        Google Analyticsa čuvaju se u razdoblju određenom postavkama našeg
        Analytics računa. Nakon isteka roka podatke brišemo ili trajno
        anonimiziramo.
      </LegalText>
    </LegalSection>

    <LegalSection title="7. Kolačići">
      <LegalText>Naša stranica koristi:</LegalText>
      <List items={COOKIES} inset />
      <LegalText>
        Analitiku pokrećemo tek nakon vaše privole. Privolu možete povući ili
        promijeniti u bilo kojem trenutku putem poveznice „Postavke kolačića” u
        podnožju stranice, a kolačiće možete i obrisati ili onemogućiti u
        postavkama preglednika. Više o Googleovim kolačićima možete saznati na{" "}
        <InlineLink
          external
          href="https://policies.google.com/technologies/cookies"
        >
          službenim Google stranicama
        </InlineLink>
        .
      </LegalText>
    </LegalSection>

    <LegalSection title="8. Sigurnost podataka">
      <LegalText>
        Primjenjujemo odgovarajuće tehničke i organizacijske mjere zaštite, među
        ostalim šifriranu (HTTPS) komunikaciju, ograničen pristup podacima samo
        ovlaštenim osobama i zaštićen administratorski pristup. Ipak, nijedna
        metoda prijenosa ili pohrane podataka putem interneta nije potpuno
        sigurna.
      </LegalText>
    </LegalSection>

    <LegalSection title="9. Vaša prava">
      <LegalText>U vezi s vašim osobnim podacima imate:</LegalText>
      <List items={RIGHTS} inset />
      <LegalText>
        Prava možete ostvariti slanjem zahtjeva na <MailLink />. Na zahtjev
        odgovaramo u roku od mjesec dana. Ako smatrate da obrada vaših podataka
        krši propise, imate pravo podnijeti pritužbu nadzornom tijelu: Agenciji
        za zaštitu osobnih podataka (AZOP), Selska cesta 136, Zagreb,{" "}
        <InlineLink external href="https://azop.hr">
          azop.hr
        </InlineLink>
        .
      </LegalText>
    </LegalSection>

    <LegalSection title="10. Izmjene pravila privatnosti">
      <LegalText>
        Ova pravila možemo povremeno izmijeniti, primjerice zbog promjene zakona
        ili naših usluga. Aktualna verzija uvijek je objavljena na ovoj stranici
        s datumom posljednje izmjene.
      </LegalText>
    </LegalSection>

    <LegalSection title="11. Kontakt">
      <LegalText>
        Za sva pitanja o obradi osobnih podataka javite nam se na <MailLink />{" "}
        ili putem kontakt obrasca na našoj web stranici.
      </LegalText>
    </LegalSection>
  </LegalPage>
);

export default Privacy;
