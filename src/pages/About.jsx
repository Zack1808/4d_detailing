import { useEffect } from "react";

import { Header, Button } from "../components";

import transition from "../helpers/transition";

import "../css/pages/About.css";

const About = ({ resetScroll }) => {
  useEffect(() => {
    resetScroll();
  }, []);

  return (
    <>
      <Header title="4D detailing" />
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2>Lorem ipsum dolor sit.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              provident earum pariatur repellat, praesentium voluptas assumenda!
              Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa
              deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum
              nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab
              officiis ipsa nihil quaerat magni beatae laborum doloremque quia
              fugiat enim nulla saepe placeat a delectus repellat doloribus,
              voluptatum ullam pariatur rerum, tempore accusantium soluta. Ad
              provident, nisi, delectus qui atque id in rerum, est nam dolorum
              ab nihil. Ut eaque ipsa quisquam, obcaecati labore aut, atque
              dolores dolore iusto placeat inventore facere, quos eius deleniti.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              provident earum pariatur repellat, praesentium voluptas assumenda!
              Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa
              deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum
              nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab
              officiis ipsa nihil quaerat magni beatae laborum doloremque quia
              fugiat enim nulla saepe placeat a delectus repellat doloribus.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Tko smo mi"
          />
        </div>
      </div>
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2>Lorem ipsum dolor sit.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              provident earum pariatur repellat, praesentium voluptas assumenda!
              Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa
              deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum
              nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab
              officiis ipsa nihil quaerat magni beatae laborum doloremque quia
              fugiat enim nulla saepe placeat a delectus repellat doloribus,
              voluptatum ullam pariatur rerum, tempore accusantium soluta. Ad
              provident, nisi, delectus qui atque id in rerum, est nam dolorum
              ab nihil. Ut eaque ipsa quisquam, obcaecati labore aut, atque
              dolores dolore iusto placeat inventore facere, quos eius deleniti.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              provident earum pariatur repellat, praesentium voluptas assumenda!
              Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa
              deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum
              nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab
              officiis ipsa nihil quaerat magni beatae laborum doloremque quia
              fugiat enim nulla saepe placeat a delectus repellat doloribus.
            </p>
            <Button primary to="/poliranje-i-zaštita">
              Vidi ponude
            </Button>
          </div>
          <img src="/poliranje.webp" alt="poliranje" />
        </div>
      </div>
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2>Lorem ipsum dolor sit.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              provident earum pariatur repellat, praesentium voluptas assumenda!
              Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa
              deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum
              nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab
              officiis ipsa nihil quaerat magni beatae laborum doloremque quia
              fugiat enim nulla saepe placeat a delectus repellat doloribus,
              voluptatum ullam pariatur rerum, tempore accusantium soluta. Ad
              provident, nisi, delectus qui atque id in rerum, est nam dolorum
              ab nihil. Ut eaque ipsa quisquam, obcaecati labore aut, atque
              dolores dolore iusto placeat inventore facere, quos eius deleniti.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              provident earum pariatur repellat, praesentium voluptas assumenda!
              Nisi, ipsum! Non fugiat, quam dolorum asperiores voluptatum ipsa
              deserunt in cumque unde, delectus voluptatem, iste natus? Nostrum
              nemo nam totam rerum repudiandae ipsum facere. Possimus omnis ab
              officiis ipsa nihil quaerat magni beatae laborum doloremque quia
              fugiat enim nulla saepe placeat a delectus repellat doloribus.
            </p>
            <Button primary to="/posebni-paketi">
              Vidi ponude
            </Button>
          </div>
          <img src="/hero-bg-big.webp" alt="paketi" />
        </div>
      </div>
    </>
  );
};

export default transition(About);
