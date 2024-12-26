import React from "react";

import transition from "../helpers/transition";

import { Header, FadeImage, Button } from "../components";

import "../css/pages/About.css";

const About = () => {
  return (
    <div className="page-container">
      <Header title="O nama" bgImage="/hero-bg-small.avif" />

      <main className="about">
        <article className="container">
          <section>
            <h2>Tko stoji iza 4D</h2>
            <p>
              Kao ljubitelji automobila od malih nogu, tim putem smo nastavili i
              u odrasloj dobi. Brigom i njegom prema vlastitim automobilima te
              zadovoljavajućim rezultatima čistoće i ljepote, željeli smo to
              zadovoljstvo i kvalitetu proširiti i donijeti vama, našim
              cijenjenim klijentima. Iz te ideje nastao je naš detailing studio,
              4D Detailing. Bilo da ste, kao i mi, zaljubljenici u automobilizam
              ili jednostavno nemate vremena ili prostora za brigu o vašem
              vozilu, mi smo tu da vam ponudimo profesionalne usluge iz svih
              područja njege i održavanja vozila.
              <br />
              <br />
              Naša vizija je jednog dana postati jedan od vodećih detailing
              studija u Republici Hrvatskoj, a možda i šire. Želimo što više
              ljudi upoznati s profesionalnom kvalitetom i rezultatima, jer
              čisti i sjajni automobili nisu trošak već ulaganje u njihovu
              trajnost.
            </p>
          </section>
          <FadeImage src="/who-is-4d.avif" alt="Opisna slika" />
        </article>
        <article className="container reversed">
          <FadeImage src="/hero-bg-big.avif" alt="Opisna slika" />
          <section>
            <h2>Sjaj u 4 dimenzije</h2>
            <p>
              Zbog zagađenja u atmosferi i utjecaja vremenskih uvjeta, vaš
              automobil s vremenom gubi svoj sjaj i atraktivnost. Ovo je posebno
              vidljivo na vozilima koja su stalno izložena suncu i nepovoljnim
              vremenskim prilikama. Ti uvjeti uzrokuju nevidljivo nakupljanje
              prljavštine i oksidaciju sloja laka, što dovodi do gubitka njegove
              ljepote. Poliranjem se može obnoviti izgubljeni sjaj i povećati
              otpornost na nečistoće.\nNaše usluge možete provjeriti ovdje.
              trajnost.
            </p>
            <Button primary link="/poliranje-i-zaštita">
              Vidi ponude
            </Button>
          </section>
        </article>
        <article className="container">
          <section>
            <h2>4D brine za vas</h2>
            <p>
              S obzirom na to da odabir njege za vozilo može biti kompliciran,
              za vas smo stvorili nekoliko različitih paketa. Oni predstavljaju
              kombinaciju naših pojedinačnih usluga iz sva tri segmenta njege
              vozila. Idealni su za one koji prvi put povjeravaju svoje vozilo
              našoj brizi, jer olakšavaju donošenje odluke. Također, odličan su
              izbor za one koji žele redovito održavati svoje vozilo kod nas,
              jer pružaju dobru osnovu za program redovnog održavanja.
              <br />
              <br />
              Provjerite naše pakete ovdje.
            </p>
            <Button primary>Vidi ponude</Button>
          </section>
          <FadeImage src="/packages.avif" alt="Opisna slika" />
        </article>
      </main>
    </div>
  );
};

export default transition(About);
