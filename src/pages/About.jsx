import React, { useEffect, useMemo } from "react";

import { Header, Button } from "../components";

import transition from "../helpers/transition";

import "../css/pages/About.css";

const About = React.memo(({ resetScroll }) => {
  useEffect(() => {
    resetScroll();
  }, []);

  const pageSections = useMemo(
    () => [
      {
        title: "Lorem ipsum dolor sit.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam provident earum pariatur repellat, praesentium voluptas assumenda! Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab officiis ipsa nihil quaerat magni beatae laborum doloremque quia fugiat enim nulla saepe placeat a delectus repellat doloribus, voluptatum ullam pariatur rerum, tempore accusantium soluta. Ad provident, nisi, delectus qui atque id in rerum, est nam dolorum ab nihil. Ut eaque ipsa quisquam, obcaecati labore aut, atque dolores dolore iusto placeat inventore facere, quos eius deleniti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam provident earum pariatur repellat, praesentium voluptas assumenda! Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab officiis ipsa nihil quaerat magni beatae laborum doloremque quia fugiat enim nulla saepe placeat a delectus repellat doloribus. ",
        img: "https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Tko smo mi",
      },
      {
        title: "Lorem ipsum dolor sit.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam provident earum pariatur repellat, praesentium voluptas assumenda! Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab officiis ipsa nihil quaerat magni beatae laborum doloremque quia fugiat enim nulla saepe placeat a delectus repellat doloribus, voluptatum ullam pariatur rerum, tempore accusantium soluta. Ad provident, nisi, delectus qui atque id in rerum, est nam dolorum ab nihil. Ut eaque ipsa quisquam, obcaecati labore aut, atque dolores dolore iusto placeat inventore facere, quos eius deleniti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam provident earum pariatur repellat, praesentium voluptas assumenda! Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab officiis ipsa nihil quaerat magni beatae laborum doloremque quia fugiat enim nulla saepe placeat a delectus repellat doloribus. ",
        img: "/poliranje.webp",
        alt: "poliranje",
        link: "/poliranje-i-zaštita",
      },
      {
        title: "Lorem ipsum dolor sit.",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam provident earum pariatur repellat, praesentium voluptas assumenda! Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab officiis ipsa nihil quaerat magni beatae laborum doloremque quia fugiat enim nulla saepe placeat a delectus repellat doloribus, voluptatum ullam pariatur rerum, tempore accusantium soluta. Ad provident, nisi, delectus qui atque id in rerum, est nam dolorum ab nihil. Ut eaque ipsa quisquam, obcaecati labore aut, atque dolores dolore iusto placeat inventore facere, quos eius deleniti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam provident earum pariatur repellat, praesentium voluptas assumenda! Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab officiis ipsa nihil quaerat magni beatae laborum doloremque quia fugiat enim nulla saepe placeat a delectus repellat doloribus. ",
        img: "/hero-bg-big.webp",
        alt: "paketi",
        link: "/posebni-paketi",
      },
    ],
    []
  );

  return (
    <>
      <Header title="4D detailing" />
      {pageSections.map((section, index) => (
        <div className="about-container" key={section.title + index}>
          <div className="about-content">
            <div className="about-text">
              <h2>{section.title}</h2>
              <p>{section.text}</p>
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
