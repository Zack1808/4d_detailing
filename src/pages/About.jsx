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
        title: "Lorem ipsum dolor sit.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam provident earum pariatur repellat, praesentium voluptas assumenda! Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab officiis ipsa nihil quaerat magni beatae laborum doloremque quia fugiat enim nulla saepe placeat a delectus repellat doloribus, voluptatum ullam pariatur rerum, tempore accusantium soluta. Ad provident, nisi, delectus qui atque id in rerum, est nam dolorum ab nihil. Ut eaque ipsa quisquam, obcaecati labore aut, atque dolores dolore iusto placeat inventore facere, quos eius deleniti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam provident earum pariatur repellat, praesentium voluptas assumenda! Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab officiis ipsa nihil quaerat magni beatae laborum doloremque quia fugiat enim nulla saepe placeat a delectus repellat doloribus. ",
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
