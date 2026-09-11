import React, { useEffect } from "react";

import Container from "../components/layout/Container";

const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Container className="pb-3!" id="contact-data">
        <h2 className="text-4xl text-dark dark:text-light mt-30 font-bold">
          Kontakt
        </h2>
      </Container>
    </main>
  );
};

export default Contact;
