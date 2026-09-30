import React, {
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from "react";

import Hero from "@features/site/components/Hero";
import Container from "@shared/components/Container";
import ReviewCarousel from "@features/site/components/ReviewCarousel";
import Modal from "@shared/components/Modal";
import Reveal from "@shared/components/Reveal";

import Button from "@shared/components/Button";
import ServiceCard from "../components/ServiceCard";
import StarSelect from "@shared/components/StarSelect";
import Input from "@shared/components/Input";
import Textarea from "@shared/components/Textarea";
import SEO from "@shared/components/SEO";

import Tesseract from "@features/site/components/animated/Tessaract";
import Wheel from "@features/site/components/animated/Wheel";

import { useGetPageData } from "@features/catalog/hooks/useGetPageData";

import { useData } from "@features/catalog/context/DataContext";
import type { ReviewType } from "@features/catalog/types";

import { generateAutoWashSchema } from "@features/site/utils/schema";
import { notifyError, notifySuccess } from "@shared/utils/toast";

const schema = generateAutoWashSchema({
  telephone: "+385-97-758-87163",
  streetAddress: "Rakitovec 274",
  addressLocality: "Velika Gorica",
  postalCode: "10410",
});

const Home: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [starCount, setStarCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const { isDark, services, reviews } = useData();

  const { setReview, error } = useGetPageData();

  const heroBackground = [
    <Tesseract
      size={1700}
      className="absolute contain-strict will-change-transform md:right-80 right-0 -z-50 opacity-15 pointer-events-none top-100 -translate-y-3/7 translate-x-1/2 rotate-z-180"
      thickness={5}
      speed={70}
      isDark={isDark}
    />,
    <Wheel
      size={1500}
      className="absolute contain-strict will-change-transform md:right-80 right-0 -z-50 opacity-15 pointer-events-none top-100 -translate-y-3/7 translate-x-1/2 rotate-y-180"
      speed={100}
      isDark={isDark}
    />,
  ];

  const [selectLoader] = useState(() => {
    const result = Math.floor(Math.random() * heroBackground.length);
    return result;
  });

  const servicesRef = useRef<HTMLDivElement>(null);

  const featuredServices = useMemo(
    () => services.filter((service) => service.isFeatured),
    [services],
  );

  const handleScroll = useCallback(() => {
    if (!servicesRef.current) return;

    servicesRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [servicesRef.current]);

  const handleReviewSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);

      try {
        const form = event.currentTarget;
        const formData = new FormData(form);

        const values = Object.fromEntries(formData.entries());

        const reviewData: Omit<ReviewType, "id"> = {
          starCount,
          name: String(values.name),
          surname: String(values.surname),
          review: String(values.review),
          isApproved: false,
        };

        const successfull = await setReview(reviewData);

        if (successfull) {
          notifySuccess("Recenzija uspješno poslana!");
          setOpenModal(false);
        } else notifyError(error ?? "Nešto je pošlo po zlu");
      } catch (err) {
        notifyError(
          err instanceof Error ? err.message : "Nešto je pošlo po zlu",
        );
      } finally {
        setLoading(false);
      }
    },
    [starCount],
  );

  const clearReviewForm = useCallback(() => {
    setStarCount(1);
  }, []);

  useEffect(() => {
    if (!openModal) {
      const timer = setTimeout(clearReviewForm, 300);

      return () => clearTimeout(timer);
    }
  }, [openModal]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <main className="relative overflow-hidden">
      {heroBackground[selectLoader]}
      <SEO
        title="4D Detailing Velika Gorica – Profesionalno čišćenje i poliranje vozila"
        description="4D Detailing – profesionalne usluge čišćenja, poliranja i zaštite vozila u Velikoj Gorici."
        canonical="https://4d-detailing.hr/"
        schema={schema}
      />
      <Hero>
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo={`opacity-100 translate-x-0`}
        >
          <h1 className="md:text-8xl text-5xl font-bold text-dark dark:text-light">
            4D Detailing
          </h1>
        </Reveal>
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo={`opacity-100 translate-x-0`}
          delay={200}
        >
          <p className="text-2xl text-dark dark:text-light font-normal">
            Luksuz koji si možete priuštiti
          </p>
        </Reveal>
        <Reveal
          className="flex sm:flex-row flex-col gap-3 mt-10"
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo={`opacity-100 translate-x-0`}
          delay={400}
        >
          <Button
            variant="secondary"
            to="/kontakt"
            className="sm:order-1 order-2"
          >
            Rezerviraj termin
          </Button>
          <Button
            variant="primary"
            onClick={handleScroll}
            className="sm:order-2 order-1"
          >
            Pregledaj usluge
          </Button>
        </Reveal>
      </Hero>

      <Container
        id="services"
        className="bg-light dark:bg-dark pt-40!"
        ref={servicesRef}
      >
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo={`opacity-100 translate-x-0`}
        >
          <h2 className="font-bold text-4xl text-dark dark:text-light">
            Naše najpopularnije usluge
          </h2>
        </Reveal>
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo={`opacity-100 translate-x-0`}
          delay={200}
        >
          <p className="text-dark dark:text-light font-light max-w-[85ch] mt-3">
            Odaberite jednu od naših najtraženijih usluga i priuštite svom
            vozilu temeljito čišćenje, obnovu i zaštitu. Izdvojili smo 3 paketa
            koje naši klijenti najčešće biraju.
          </p>
        </Reveal>

        <div className="w-full grid xl:grid-cols-3 grid-cols-1 lg:grid-cols-2 gap-3 mt-6">
          {featuredServices.map((service, index) => {
            return (
              <Reveal
                key={`${service.title}-${index}`}
                transitionTo={`opacity-100 translate-y-0`}
                className={`flex h-full lg:nth-[2]:delay-100! lg:nth-[3]:delay-200! md:nth-[2]:delay-200! md:duration-1000 duration-500`}
                threshold={0.05}
              >
                <ServiceCard item={service} />
              </Reveal>
            );
          })}
        </div>

        <div className="flex w-full md:flex-row flex-col md:items-center gap-6 mt-3 justify-between">
          <div className="flex flex-col gap-3">
            <Reveal
              transitionFrom="opacity-0 -translate-x-6"
              transitionTo={`opacity-100 translate-x-0`}
              threshold={0.5}
            >
              <h3 className="text-dark dark:text-light text-xl font-semibold">
                Ne znate koja je usluga najbolja za vaše vozilo?
              </h3>
            </Reveal>
            <Reveal
              transitionFrom="opacity-0 -translate-x-6"
              transitionTo={`opacity-100 translate-x-0`}
            >
              <p className="text-dark dark:text-light font-light max-w-[85ch]">
                Pogledajte kompletnu ponudu i pronađite paket koji vam odgovara.
              </p>
            </Reveal>
          </div>

          <Reveal
            transitionFrom="opacity-0 md:translate-x-6 -translate-x-6"
            transitionTo={`opacity-100 translate-x-0`}
          >
            <Button variant="secondary" to="/usluge?sortiranje=popularno">
              Pregledajte sve usluge
            </Button>
          </Reveal>
        </div>
      </Container>

      <Container id="about">
        <div className="w-full flex xl:flex-row flex-col gap-6 justify-between">
          <div>
            <Reveal
              transitionFrom="opacity-0 -translate-x-6"
              transitionTo={`opacity-100 translate-x-0`}
            >
              <h2 className="font-bold text-4xl text-dark dark:text-light">
                Naša misija
              </h2>
            </Reveal>
            <div>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light max-w-[85ch] mt-6">
                  <strong className="font-semibold">
                    4D Detailing nastao je iz ljubavi prema automobilima i želje
                    da tu strast pretvorimo u vrhunsku uslugu.
                  </strong>
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light max-w-[85ch] mt-6 font-light">
                  Ljubav prema automobilima prati nas od malih nogu. Briga o
                  vlastitim vozilima, pažnja prema detaljima i zadovoljstvo koje
                  donosi savršeno čist i očuvan automobil bili su početak priče
                  koja je dovela do stvaranja 4D Detailing studija.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light max-w-[85ch] mt-6 font-light">
                  Danas tu istu pažnju želimo pružiti svakom vozilu koje nam
                  povjerite. Vjerujemo da detailing nije samo obično čišćenje
                  automobila, već cjelovita njega kojom se čuva njegov izgled,
                  kvaliteta i dugotrajnost. Zato svakom vozilu pristupamo
                  individualno, temeljito i s posebnom pažnjom prema detaljima.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light max-w-[85ch] mt-6 font-light">
                  Bilo da ste pravi zaljubljenik u automobile ili jednostavno
                  želite svoje vozilo održavati urednim i očuvanim bez trošenja
                  vlastitog vremena,{" "}
                  <strong className="font-semibold">
                    naš cilj je pružiti vam kvalitetu kojoj možete vjerovati.
                  </strong>
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light max-w-[85ch] mt-6 font-light">
                  Želimo profesionalnu njegu vozila približiti što većem broju
                  ljudi i pokazati da kvalitetno održavanje nije nepotreban
                  trošak, već{" "}
                  <strong className="font-semibold">
                    ulaganje u izgled, očuvanost i vrijednost vašeg automobila.
                  </strong>
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light max-w-[85ch] mt-6 font-light">
                  Svaki automobil koji izađe iz našeg studija predstavlja naš
                  rad, našu reputaciju i povjerenje koje ste nam ukazali. Upravo
                  zato nastojimo da rezultat uvijek bude nešto iza čega možemo
                  ponosno stati.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal
            transitionFrom="opacity-0 xl:translate-x-6 xl:translate-y-0 translate-y-6 translate-x-0"
            transitionTo={`opacity-100 translate-x-0 translate-y-0`}
            className="flex flex-col gap-3 xl:w-3/7 w-full xl:mt-15 mt-6"
          >
            <img
              src="/images/founder.avif"
              alt="Slika osnivatelja"
              className="object-cover rounded-sm"
              width={729}
              height={485}
              loading="lazy"
              decoding="async"
            />
            <small className="font-semibold text-dark dark:text-light italic">
              Luka Novak - Osnivač 4D Detailinga
            </small>
          </Reveal>
        </div>
      </Container>

      <Container id="reviews">
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo={`opacity-100 translate-x-0`}
        >
          <h2 className="font-bold text-4xl text-dark dark:text-light">
            Što kažu naši klijenti?
          </h2>
        </Reveal>
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo={`opacity-100 translate-x-0`}
        >
          <p className="text-dark dark:text-light font-light">
            Vaše zadovoljstvo je naša najbolja preporuka.
            <br />
            Pogledajte iskustva onih koji su svoje vozilo već povjerili 4D
            Detailing timu.
          </p>
        </Reveal>

        <Reveal
          className="relative mt-3 w-full overflow-hidden"
          transitionTo="opacity-100 translate-y-0"
        >
          <ReviewCarousel reviews={reviews} />
        </Reveal>

        <div className="flex w-full md:flex-row flex-col md:items-center gap-6 mt-3 justify-between">
          <div className="flex flex-col gap-3">
            <Reveal
              transitionFrom="opacity-0 -translate-x-6"
              transitionTo={`opacity-100 translate-x-0`}
            >
              <h3 className="text-dark dark:text-light text-xl font-semibold">
                Bili ste zadovoljni našom uslugom?
              </h3>
            </Reveal>
            <Reveal
              transitionFrom="opacity-0 -translate-x-6"
              transitionTo={`opacity-100 translate-x-0`}
            >
              <p className="font-light text-dark dark:text-light max-w-[85ch]">
                Vaše mišljenje nam puno znači. Ako ste već svoje vozilo
                povjerili našem timu, podijelite svoje iskustvo i pomozite
                drugima da nas lakše upoznaju.
              </p>
            </Reveal>
          </div>

          <Reveal
            transitionFrom="opacity-0 md:translate-x-6 -translate-x-6"
            transitionTo={`opacity-100 translate-x-0`}
          >
            <Button variant="primary" onClick={() => setOpenModal(true)}>
              Ostavite recenziju
            </Button>
          </Reveal>
        </div>
      </Container>

      <Container id="cta-contact">
        <div className="flex w-full md:flex-row flex-col md:items-center gap-6 mt-3 justify-between">
          <div className="flex flex-col gap-3">
            <Reveal
              transitionFrom="opacity-0 -translate-x-6"
              transitionTo={` opacity-100 translate-x-0`}
            >
              <h3 className="text-dark dark:text-light text-4xl font-bold">
                Vaš automobil zaslužuje više od običnog čišćenja.
              </h3>
            </Reveal>
            <div>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={`opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light font-light mt-3 max-w-[85ch]">
                  Detalji čine razliku. Od dubinskog čišćenja do poliranja i
                  zaštite, u 4D Detailingu svakom vozilu pristupamo s istom
                  pažnjom kao da je naše vlastito.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light mt-3 max-w-[85ch] font-light">
                  Dopustite nam da vratimo vašem automobilu svježinu, sjaj i
                  osjećaj novog.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light mt-3 max-w-[85ch] font-light">
                  Niste sigurni što je potrebno vašem vozilu? Javite nam se —
                  rado ćemo vam preporučiti najbolju opciju.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light mt-3 max-w-[85ch] font-light">
                  Rezervirajte svoj termin i prepustite svoje vozilo u naše
                  ruke.
                </p>
              </Reveal>
            </div>

            <Reveal
              transitionFrom="opacity-0 -translate-x-6"
              transitionTo={`opacity-100 translate-x-0`}
            >
              <Button variant="primary" to="/kontakt" className="mt-6">
                Rezerviraj termin
              </Button>
            </Reveal>
          </div>
          <img
            src={isDark ? "/images/logo_dark.svg" : "/images/logo_light.svg"}
            className="w-1/3 md:flex hidden"
            alt=""
            loading="lazy"
            width={567}
            height={495}
          />
        </div>
      </Container>

      <Modal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        title={"Ostavite recenziju"}
      >
        <form
          onSubmit={handleReviewSubmit}
          className="mt-6 flex flex-col gap-6"
        >
          <label
            htmlFor="star-count"
            className="text-dark dark:text-light font-light flex flex-col gap-3"
          >
            Recenzija *
            <StarSelect
              count={starCount}
              setCount={setStarCount}
              name="star-count"
            />
          </label>
          <label
            htmlFor="name"
            className="text-dark dark:text-light font-light flex flex-col gap-3"
          >
            Ime *
            <Input required placeholder="Ivan" name="name" />
          </label>
          <label
            htmlFor="surname"
            className="text-dark dark:text-light font-light flex flex-col gap-3"
          >
            Prezime *
            <Input required placeholder="Ivic" name="surname" />
          </label>
          <label
            htmlFor="message"
            className="text-dark dark:text-light font-light flex flex-col gap-3"
          >
            Poruka *
            <Textarea placeholder="Unesite  poruku" required name="review" />
          </label>
          <Button variant="primary" className="self-end" loading={loading}>
            Pošalji recenziju
          </Button>
        </form>
      </Modal>
    </main>
  );
};

export default Home;
