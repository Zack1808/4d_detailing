import React, { useEffect, useMemo, useCallback } from "react";

import { Header, Button } from "../components";

import transition from "../helpers/transition";

import "../css/pages/About.css";

const About = React.memo(({ resetScroll }) => {
  useEffect(() => {
    resetScroll();
  }, [resetScroll]);

  const pageSections = useMemo(
    () => [
      {
        title: "Tko stoji iza 4D Detailinga",
        text: "Kao ljubitelji automobila od malih nogu, tim putem smo nastavili i u odraslim danima. Brigom i njegom prema vlastitim automobilima te zadovoljavajućim rezultatima čistoće i ljepote željeli smo to zadovoljstvo i kvalitetu proširiti i donijeti i vama, našim cijenjenim klijentima. Iz te ideje nastao je naš detailing studio 4D Detailing. Bilo da ste kao i mi zaljubljenici u automobilizam ili jednostavno nemate vremena ili mjesta brinuti se za vaše vozilo, mi smo tu da vam ponudimo profesionalne usluge iz svih područja njege i održavanja vozila.\nNaša je vizija jednog dana biti jedni od vodećih detailing studija u Republici Hrvatskoj, a možda i šire. Želimo što više ljudi ponuditi profesionalnu kvalitetu i rezultate, jer čisti i sjajni automobili nisu trošak već ulaganje u njihovu trajnost.",
        img: "https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Tko smo mi",
      },
      {
        title: "Sjaj u 4 dimenzije",
        text: "Zbog zagađenja u atmosferi i utjecaja vremenskih uvjeta, vaš automobil s vremenom gubi svoj sjaj i atraktivnost. To je posebno vidljivo na vozilima koja su stalno izložena suncu i nepovoljnim vremenskim prilikama. Ovi uvjeti uzrokuju nevidljivo nakupljanje prljavštine i oksidaciju sloja laka, što dovodi do gubitka njegove ljepote. Poliranjem se može obnoviti izgubljeni sjaj i povećati otpornost na nečistoće.\nNaše usluge možete provjeriti ovdje.",
        img: "/poliranje.webp",
        alt: "poliranje",
        link: "/poliranje-i-zaštita",
      },
      {
        title: "4D brine za Vas",
        text: `Kako odabir njege za vozilo može biti kompliciran, za Vas smo stvorili par različitih paketa. Oni predstavljaju kombinaciju naših pojedinačnih ponuda iz sva tri segmenta njege vozila. Idealni su za one koji prvi put povjeravaju svoje vozilo našoj brizi, kako bi im olakšali donošenje odluke. Također, odličan su izbor za one koji žele redovito održavati svoje vozilo kod nas, jer pružaju dobru osnovu za program redovnog održavanja.\nProvjerite naše pakete ovdje.`,
        img: "/hero-bg-big.webp",
        alt: "paketi",
        link: "/posebni-paketi",
      },
    ],
    []
  );

  const returnText = useCallback((text) => {
    const newText = text.split(/\n/);
    if (newText.length < 2) return text;
    return newText.map((t, index) => {
      if (index === newText.length - 1) return t;
      return (
        <React.Fragment key={t}>
          {t}
          <br />
          <br />
        </React.Fragment>
      );
    });
  }, []);

  return (
    <>
      <Header title="4D detailing" />
      {pageSections.map((section, index) => (
        <div className="about-container" key={section.title + index}>
          <div className="about-content">
            <div className="about-text">
              <h2>{section.title}</h2>

              <p>{returnText(section.text)}</p>
              {section.link && (
                <Button primary to={section.link}>
                  Vidi ponude
                </Button>
              )}
            </div>
            <img src={section.img} alt={section.alt} />
          </div>
        </div>
      ))}
    </>
  );
});

export default transition(About);
