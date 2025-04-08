import React, { useEffect } from "react";

import transition from "../helpers/transition";

import { Header, FadeImage, Button } from "../components";

import { useScrollPosition } from "../context/scrollContext";
import { useStore } from "../context/storeContext";

import "../css/pages/About.css";

const About = () => {
  const { resetScroll } = useScrollPosition();

  const { aboutHeader, aboutData } = useStore();

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

  return (
    <>
      <Header title={aboutHeader.title} bgImage={aboutHeader.headerImg} />

      <main className="about">
        {aboutData?.map((item) => {
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
              <FadeImage src={item.imageUrl} alt="Opisna slika" />
            </article>
          );
        })}
      </main>
    </>
  );
};

export default About;
