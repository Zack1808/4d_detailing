import React, { useEffect } from "react";

import { Header, Button } from "../components";

import { useScrollPosition } from "../context/scrollContext";

import transition from "../helpers/transition";

import "../css/pages/Error404.css";

const Error404 = React.memo(() => {
  const { resetScroll } = useScrollPosition();

  useEffect(() => () => resetScroll());

  return (
    <div className="page-not-found">
      <Header
        title="Oops"
        bgImage="https://images.unsplash.com/photo-1633078654544-61b3455b9161?q=80&w=1945&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <main>
        <article className="container">
          <p>Izgleda da ste malo odlutali od sadržaja ove stranice.</p>
          <Button primary link="/">
            Vrati se na početnu
          </Button>
        </article>
      </main>
    </div>
  );
});

export default Error404;
