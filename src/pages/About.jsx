import React, { forwardRef, useEffect } from "react";

import { Header, FadeImage, Button } from "../components";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import "../css/pages/About.css";

const About = React.memo(() => {
  const { resetScroll } = useScrollPosition();

  const { aboutData } = useStore();

  useEffect(() => {
    const link = document.createElement("link");
    const meta = document.createElement("meta");

    link.rel = "canonical";
    link.href = "https://4d-detailing.hr/o-nama";
    document.head.appendChild(link);

    meta.setAttribute("property", "og:url");
    meta.content = "https://4d-detailing.hr/o-nama";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(meta);
      resetScroll();
    };
  }, []);

  const image = ["/who-is-4d.avif", "/hero-bg-big.avif", "/packages.avif"];

  const about = [
    {
      title: "Tko stoji iza 4D",
      content: `Kao ljubitelji automobila od malih nogu, tim putem smo nastavili i u odrasloj dobi. Brigom i njegom prema vlastitim automobilima te zadovoljavajućim rezultatima čistoće i ljepote, željeli smo to zadovoljstvo i kvalitetu proširiti i donijeti vama, našim cijenjenim klijentima. Iz te ideje nastao je naš detailing studio, 4D Detailing. Bilo da ste, kao i mi, zaljubljenici u automobilizam ili jednostavno nemate vremena ili prostora za brigu o vašem vozilu, mi smo tu da vam ponudimo profesionalne usluge iz svih područja njege i održavanja vozila.\n\nNaša vizija je jednog dana postati jedan od vodećih detailing studija u Republici Hrvatskoj, a možda i šire. Želimo što više ljudi upoznati s profesionalnom kvalitetom i rezultatima, jer čisti i sjajni automobili nisu trošak već ulaganje u njihovu trajnost.`,
    },
    {
      title: "Sjaj u 4 dimenzije",
      content: `Zbog zagađenja u atmosferi i utjecaja vremenskih uvjeta, vaš automobil s vremenom gubi svoj sjaj i atraktivnost. Ovo je posebno vidljivo na vozilima koja su stalno izložena suncu i nepovoljnim vremenskim prilikama. Ti uvjeti uzrokuju nevidljivo nakupljanje prljavštine i oksidaciju sloja laka, što dovodi do gubitka njegove ljepote. Poliranjem se može obnoviti izgubljeni sjaj i povećati otpornost na nečistoće.\nNaše usluge možete provjeriti ovdje. trajnost.`,
      forwardLink: "/poliranje-i-zaštita",
    },
    {
      title: "4D brine za vas",
      content: `S obzirom na to da odabir njege za vozilo može biti kompliciran, za vas smo stvorili nekoliko različitih paketa. Oni predstavljaju kombinaciju naših pojedinačnih usluga iz sva tri segmenta njege vozila. Idealni su za one koji prvi put povjeravaju svoje vozilo našoj brizi, jer olakšavaju donošenje odluke. Također, odličan su izbor za one koji žele redovito održavati svoje vozilo kod nas, jer pružaju dobru osnovu za program redovnog održavanja.\n\nProvjerite naše pakete ovdje.`,
      forwardLink: "/posebni-paketi",
    },
  ];

  return (
    <>
      <Header title="O nama" fallbackImage="/hero-bg-small.avif" />

      <main className="about">
        {about.map((item, index) => {
          return (
            <article className="container" key={item.id}>
              <section>
                <h2>{item.title}</h2>
                <p>
                  {item.content?.split(/\n/g).map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
                {item.forwardLink && (
                  <Button primary link={item.forwardLink}>
                    Vidi ponude
                  </Button>
                )}
              </section>
              <FadeImage alt="Opisna slika" fallbackImage={image[index]} />
            </article>
          );
        })}
      </main>
    </>
  );
});

export default About;
