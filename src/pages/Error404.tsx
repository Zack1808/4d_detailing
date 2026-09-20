import React from "react";

import Button from "../components/common/Button";

import Container from "../components/layout/Container";
import Reveal from "../components/layout/Reveal";

import Tesseract from "../components/animated/Tessaract";

import { useData } from "../context/DataContext";

const Error404: React.FC = () => {
  const { isDark } = useData();

  return (
    <main className="h-screen flex items-center justify-center relative overflow-hidden">
      <Tesseract
        size={1700}
        className="absolute md:right-80 right-0 -z-50 opacity-15 pointer-events-none top-100 -translate-y-3/7 translate-x-1/2 rotate-z-180"
        thickness={5}
        speed={70}
        isDark={isDark}
      />

      <Tesseract
        size={1700}
        className="absolute right-100 -translate-x-1/2 -z-50 opacity-15 pointer-events-none top-0 -translate-y-2/7 md:block hidden"
        thickness={5}
        speed={70}
        isDark={isDark}
      />
      <Container className="bg-light/80 dark:bg-dark/80 h-full items-center">
        <div
          className="flex items-center justify-center w-full
         flex-col gap-6"
        >
          <Reveal delay={200}>
            <h2 className="font-bold md:text-9xl text-6xl text-dark dark:text-light text-center">
              404 <br />
              <span className="md:text-5xl text-2xl mt-6 font-semibold">
                Ups... promašili ste skretanje.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-dark dark:text-light max-w-[75ch] mt-3 text-center font-light">
              Ova stranica ne postoji, ali nema potrebe za panikom i naglim
              kočenjem.{" "}
            </p>
          </Reveal>
          <Reveal delay={400}>
            <p className="text-dark dark:text-light max-w-[75ch] mt-3 text-center font-light">
              Ubacite u rikverc i vratite se na početnu.
            </p>
          </Reveal>
          <Reveal delay={500}>
            <Button variant="primary" to="/">
              Vrati se na početnu
            </Button>
          </Reveal>
        </div>
      </Container>
    </main>
  );
};

export default Error404;
