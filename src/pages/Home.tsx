import React, {
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from "react";
import { FaCircleXmark, FaCircleCheck } from "react-icons/fa6";
import { toast } from "react-toastify";

import Hero from "../components/layout/Hero";
import Container from "../components/layout/Container";
import ReviewCarousel from "../components/layout/ReviewCarousel";
import Modal from "../components/layout/Modal";
import Reveal from "../components/layout/Reveal";

import Button from "../components/common/Button";
import ServiceCard from "../components/common/ServiceCard";
import StarSelect from "../components/common/StarSelect";
import Input from "../components/common/Input";
import Textarea from "../components/common/Textarea";

import Tesseract from "../components/animated/Tessaract";
import Wheel from "../components/animated/Wheel";

import { useGetPageData } from "../hooks/useGetPageData";

import { useData } from "../context/DataContext";
import type { ReviewType } from "../types/data";

const toastClasses =
  "rounded-xs! bg-[#e5e5e4]! dark:bg-[#1e1716]! text-dark! dark:text-light!";

const Home: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [starCount, setStarCount] = useState<number>(1);

  const { isDark, services, reviews } = useData();

  const { setReview, loading, error, pageLoading } = useGetPageData();

  const heroBackground = [
    <Tesseract
      size={1700}
      className="absolute md:right-80 right-0 -z-50 opacity-15 pointer-events-none top-100 -translate-y-3/7 translate-x-1/2 rotate-z-180"
      thickness={5}
      speed={70}
      isDark={isDark}
    />,
    <Wheel
      size={1500}
      className="absolute md:right-80 right-0 -z-50 opacity-15 pointer-events-none top-100 -translate-y-3/7 translate-x-1/2 rotate-y-180"
      speed={70}
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

      try {
        const form = event.currentTarget;
        const formData = new FormData(form);

        const values = Object.fromEntries(formData.entries());

        const reviewData: ReviewType = {
          starCount,
          name: String(values.name),
          surname: String(values.surname),
          review: String(values.review),
          approvedBy: null,
        };

        const successfull = await setReview(reviewData);

        if (successfull) {
          toast.success("Recenzija uspješno poslana!", {
            className: toastClasses,
            icon: (
              <FaCircleCheck className="text-green-400! dark:text-green-900! w-full! h-full!" />
            ),
            progressClassName: "bg-green-400! dark:bg-green-900!",
          });
          setOpenModal(false);
        } else
          toast.error(error, {
            className: toastClasses,
            icon: (
              <FaCircleXmark className="text-red-400! dark:text-red-900! w-full! h-full!" />
            ),
          });
      } catch (err) {
        toast.error(error, { theme: isDark ? "dark" : "light" });
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
      <Hero>
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo={`opacity-100 translate-x-0 ${pageLoading ? "delay-200 duration-1000" : ""}`}
        >
          <h1 className="md:text-8xl text-5xl font-bold  text-dark dark:text-light">
            4D Detailing
          </h1>
        </Reveal>
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo={`opacity-100 translate-x-0 ${pageLoading ? "delay-400 duration-1000" : ""}`}
        >
          <p className="text-2xl text-dark dark:text-light">
            Luksuz koji si možete priuštiti
          </p>
        </Reveal>
        <Reveal
          className="flex sm:flex-row flex-col gap-2 mt-10"
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo={`opacity-100 translate-x-0 ${pageLoading ? "delay-600 duration-1000" : ""}`}
        >
          <Button variant="primary" onClick={handleScroll}>
            Pregledaj usluge
          </Button>
          <Button variant="secondary" to="/kontakt">
            Rezerviraj termin
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
          transitionTo={`opacity-100 translate-x-0 duration-1000`}
        >
          <h2 className="font-bold text-4xl text-dark dark:text-light">
            Naše najpopularnije usluge
          </h2>
        </Reveal>
        <Reveal
          transitionFrom="opacity-0 -translate-x-6"
          transitionTo={`opacity-100 translate-x-0 delay-200 duration-1000`}
        >
          <p className="text-dark dark:text-light max-w-[85ch] mt-3">
            Odaberite jednu od naših najtraženijih usluga i priuštite svom
            vozilu temeljito čišćenje, obnovu i zaštitu. Izdvojili smo 3 paketa
            koje naši klijenti najčešće biraju.
          </p>
        </Reveal>

        <div className="w-full grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {featuredServices.map((service, index) => {
            return (
              <Reveal
                key={`${service.title}-${index}`}
                transitionTo={`opacity-100 translate-y-0 md:delay-(--delay) duration-1000`}
                className={`flex h-full`}
                style={
                  {
                    "--delay": `${index * 200 + 200}ms`,
                  } as React.CSSProperties
                }
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
              <h5 className="text-dark dark:text-light text-xl font-bold">
                Ne znate koja je usluga najbolja za vaše vozilo?
              </h5>
            </Reveal>
            <Reveal
              transitionFrom="opacity-0 -translate-x-6"
              transitionTo={`delay-200 opacity-100 translate-x-0`}
            >
              <p className="text-dark dark:text-light max-w-[85ch]">
                Pogledajte kompletnu ponudu i pronađite paket koji vam odgovara.
              </p>
            </Reveal>
          </div>

          <Reveal
            transitionFrom="opacity-0 md:translate-x-6 -translate-x-6"
            transitionTo={`md:delay-400 delay-200 opacity-100 translate-x-0`}
          >
            <Button variant="secondary" to="/usluge">
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
                  <strong>
                    4D Detailing nastao je iz ljubavi prema automobilima i želje
                    da tu strast pretvorimo u vrhunsku uslugu.
                  </strong>
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light max-w-[85ch] mt-6">
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
                <p className="text-dark dark:text-light max-w-[85ch] mt-6">
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
                <p className="text-dark dark:text-light max-w-[85ch] mt-6">
                  Bilo da ste pravi zaljubljenik u automobile ili jednostavno
                  želite svoje vozilo održavati urednim i očuvanim bez trošenja
                  vlastitog vremena,{" "}
                  <strong>
                    naš cilj je pružiti vam kvalitetu kojoj možete vjerovati.
                  </strong>
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light max-w-[85ch] mt-6">
                  Želimo profesionalnu njegu vozila približiti što većem broju
                  ljudi i pokazati da kvalitetno održavanje nije nepotreban
                  trošak, već
                  <strong>
                    ulaganje u izgled, očuvanost i vrijednost vašeg automobila.
                  </strong>
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light max-w-[85ch] mt-6">
                  Svaki automobil koji izađe iz našeg studija predstavlja naš
                  rad, našu reputaciju i povjerenje koje ste nam ukazali. Upravo
                  zato nastojimo da rezultat uvijek bude nešto iza čega možemo
                  ponosno stati.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal
            transitionFrom="opacity-0 md:translate-x-6 md:translate-y-0 translate-y-6 translate-x-0"
            transitionTo={`md:delay-200 opacity-100 translate-x-0 translate-y-0`}
            className="flex flex-col gap-3 xl:w-3/7 w-full xl:mt-15 mt-6"
          >
            <img
              src="/images/founder.avif"
              alt="Slika osnivatelja"
              className="object-cover rounded-sm"
            />
            <small className="font-bold text-dark dark:text-light italic">
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
          transitionTo={`delay-200 opacity-100 translate-x-0`}
        >
          <p className="text-dark dark:text-light">
            Vaše zadovoljstvo je naša najbolja preporuka.
            <br />
            Pogledajte iskustva onih koji su svoje vozilo već povjerili 4D
            Detailing timu.
          </p>
        </Reveal>

        <Reveal
          className="relative mt-3 w-full overflow-hidden"
          transitionTo="opacity-100 translate-y-0 delay-400 duration-1000"
        >
          <ReviewCarousel reviews={reviews} />
        </Reveal>

        <div className="flex w-full md:flex-row flex-col md:items-center gap-6 mt-3 justify-between">
          <div className="flex flex-col gap-3">
            <Reveal
              transitionFrom="opacity-0 -translate-x-6"
              transitionTo={`opacity-100 translate-x-0`}
            >
              <h5 className="text-dark dark:text-light text-xl font-bold">
                Bili ste zadovoljni našom uslugom?
              </h5>
            </Reveal>
            <Reveal
              transitionFrom="opacity-0 -translate-x-6"
              transitionTo={`delay-200 opacity-100 translate-x-0`}
            >
              <p className="text-dark dark:text-light max-w-[85ch]">
                Vaše mišljenje nam puno znači. Ako ste već svoje vozilo
                povjerili našem timu, podijelite svoje iskustvo i pomozite
                drugima da nas lakše upoznaju.
              </p>
            </Reveal>
          </div>

          <Reveal
            transitionFrom="opacity-0 md:translate-x-6 -translate-x-6"
            transitionTo={`md:delay-400 delay-200 opacity-100 translate-x-0`}
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
                <p className="text-dark dark:text-light mt-3 max-w-[85ch]">
                  Detalji čine razliku. Od dubinskog čišćenja do poliranja i
                  zaštite, u 4D Detailingu svakom vozilu pristupamo s istom
                  pažnjom kao da je naše vlastito.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light mt-3 max-w-[85ch]">
                  Dopustite nam da vratimo vašem automobilu svježinu, sjaj i
                  osjećaj novog.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light mt-3 max-w-[85ch]">
                  Niste sigurni što je potrebno vašem vozilu? Javite nam se —
                  rado ćemo vam preporučiti najbolju opciju.
                </p>
              </Reveal>
              <Reveal
                transitionFrom="opacity-0 -translate-x-6"
                transitionTo={` opacity-100 translate-x-0`}
              >
                <p className="text-dark dark:text-light mt-3 max-w-[85ch]">
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
            loading="lazy"
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
            className="text-dark dark:text-light font-semibold flex flex-col gap-3"
          >
            Recenzija*
            <StarSelect
              count={starCount}
              setCount={setStarCount}
              name="star-count"
            />
          </label>
          <label
            htmlFor="name"
            className="text-dark dark:text-light font-semibold flex flex-col gap-3"
          >
            Ime*
            <Input required placeholder="Ivan" name="name" />
          </label>
          <label
            htmlFor="surname"
            className="text-dark dark:text-light font-semibold flex flex-col gap-3"
          >
            Prezime*
            <Input required placeholder="Ivic" name="surname" />
          </label>
          <label
            htmlFor="message"
            className="text-dark dark:text-light font-semibold flex flex-col gap-3"
          >
            Poruka*
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
