import React, {
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from "react";
import { FaCircleXmark, FaCircleCheck } from "react-icons/fa6";

import Hero from "../components/layout/Hero";
import Container from "../components/layout/Container";
import Carousel from "../components/layout/ReviewCarousel";
import Modal from "../components/layout/Modal";

import Button from "../components/common/Button";
import ServiceCard from "../components/common/ServiceCard";
import StarSelect from "../components/common/StarSelect";
import Input from "../components/common/Input";
import Textarea from "../components/common/Textarea";

import Tesseract from "../components/animated/Tessaract";

import { useGetPageData } from "../hooks/useGetPageData";

import { useData } from "../context/DataContext";
import type { ReviewType } from "../types/data";
import { toast } from "react-toastify";

const toastClasses =
  "rounded-xs! bg-[#e5e5e4]! dark:bg-[#1e1716]! text-dark! dark:text-light!";

const Home: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [starCount, setStarCount] = useState<number>(1);

  const { isDark, services, reviews } = useData();

  const { setReview, loading, error } = useGetPageData();

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
      <Tesseract
        size={1700}
        className="absolute md:right-80 right-0 -z-50 opacity-15 pointer-events-none top-100 -translate-y-3/7 translate-x-1/2 rotate-z-180"
        thickness={5}
        speed={70}
        isDark={isDark}
      />

      <Hero>
        <h1 className="md:text-8xl text-5xl font-bold  text-dark dark:text-light">
          4D Detailing
        </h1>
        <p className="text-2xl text-dark dark:text-light">
          Sjaj koji nadilazi vrijeme.
        </p>
        <div className="flex sm:flex-row flex-col gap-2 mt-10">
          <Button variant="primary" onClick={handleScroll}>
            Pregledaj usluge
          </Button>
          <Button variant="secondary" to="/kontakt">
            Rezerviraj termin
          </Button>
        </div>
      </Hero>

      <Container
        id="services"
        className="bg-light dark:bg-dark pt-40!"
        ref={servicesRef}
      >
        <h2 className="font-bold text-4xl text-dark dark:text-light">
          Naše najpopularnije usluge
        </h2>
        <p className="text-dark dark:text-light max-w-[85ch] mt-3">
          Odaberite jednu od naših najtraženijih usluga i priuštite svom vozilu
          temeljito čišćenje, obnovu i zaštitu. Izdvojili smo 3 paketa koje naši
          klijenti najčešće biraju.
        </p>

        <div className="w-full grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {featuredServices.map((service, index) => (
            <ServiceCard item={service} key={`${service.title}-${index}`} />
          ))}
        </div>

        <div className="flex w-full md:flex-row flex-col md:items-center gap-6 mt-3 justify-between">
          <div className="flex flex-col gap-3">
            <h5 className="text-dark dark:text-light text-xl font-bold">
              Ne znate koja je usluga najbolja za vaše vozilo?
            </h5>
            <p className="text-dark dark:text-light max-w-[85ch]">
              Pogledajte kompletnu ponudu i pronađite paket koji vam odgovara.
            </p>
          </div>

          <Button variant="secondary" to="/usluge">
            Pregledajte sve usluge
          </Button>
        </div>
      </Container>

      <Container id="about">
        <div className="w-full flex md:flex-row flex-col gap-6 justify-between">
          <div>
            <h2 className="font-bold text-4xl text-dark dark:text-light">
              Naša misija
            </h2>
            <p className="text-dark dark:text-light max-w-[85ch] mt-6">
              <strong>
                4D Detailing nastao je iz ljubavi prema automobilima i želje da
                tu strast pretvorimo u vrhunsku uslugu.
              </strong>
              <br />
              <br />
              Ljubav prema automobilima prati nas od malih nogu. Briga o
              vlastitim vozilima, pažnja prema detaljima i zadovoljstvo koje
              donosi savršeno čist i očuvan automobil bili su početak priče koja
              je dovela do stvaranja 4D Detailing studija.
              <br />
              <br />
              Danas tu istu pažnju želimo pružiti svakom vozilu koje nam
              povjerite. Vjerujemo da detailing nije samo obično čišćenje
              automobila, već cjelovita njega kojom se čuva njegov izgled,
              kvaliteta i dugotrajnost. Zato svakom vozilu pristupamo
              individualno, temeljito i s posebnom pažnjom prema detaljima.
              <br />
              <br />
              Bilo da ste pravi zaljubljenik u automobile ili jednostavno želite
              svoje vozilo održavati urednim i očuvanim bez trošenja vlastitog
              vremena,{" "}
              <strong>
                naš cilj je pružiti vam kvalitetu kojoj možete vjerovati.
              </strong>
              <br />
              <br />
              Želimo profesionalnu njegu vozila približiti što većem broju ljudi
              i pokazati da kvalitetno održavanje nije nepotreban trošak, već
              <strong>
                ulaganje u izgled, očuvanost i vrijednost vašeg automobila.
              </strong>
              <br />
              <br />
              Svaki automobil koji izađe iz našeg studija predstavlja naš rad,
              našu reputaciju i povjerenje koje ste nam ukazali. Upravo zato
              nastojimo da rezultat uvijek bude nešto iza čega možemo ponosno
              stati.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:w-3/7 w-full md:mt-15 mt-6">
            <img
              src="/images/founder.avif"
              alt="Slika osnivatelja"
              className="object-cover rounded-sm"
            />
            <small className="font-bold text-dark dark:text-light italic">
              Luka Novak - Osnivač 4D Detailinga
            </small>
          </div>
        </div>
      </Container>

      <Container id="reviews">
        <h2 className="font-bold text-4xl text-dark dark:text-light">
          Što kažu naši klijenti?
        </h2>
        <p className="text-dark dark:text-light">
          Vaše zadovoljstvo je naša najbolja preporuka.
          <br />
          Pogledajte iskustva onih koji su svoje vozilo već povjerili 4D
          Detailing timu.
        </p>

        <Carousel reviews={reviews} />

        <div className="flex w-full md:flex-row flex-col md:items-center gap-6 mt-3 justify-between">
          <div className="flex flex-col gap-3">
            <h5 className="text-dark dark:text-light text-xl font-bold">
              Bili ste zadovoljni našom uslugom?
            </h5>
            <p className="text-dark dark:text-light max-w-[85ch]">
              Vaše mišljenje nam puno znači. Ako ste već svoje vozilo povjerili
              našem timu, podijelite svoje iskustvo i pomozite drugima da nas
              lakše upoznaju.
            </p>
          </div>

          <Button variant="primary" onClick={() => setOpenModal(true)}>
            Ostavite recenziju
          </Button>
        </div>
      </Container>

      <Container id="cta-contact">
        <div className="flex w-full md:flex-row flex-col md:items-center gap-6 mt-3 justify-between">
          <div className="flex flex-col gap-3">
            <h3 className="text-dark dark:text-light text-4xl font-bold">
              Vaš automobil zaslužuje više od običnog čišćenja.
            </h3>
            <p className="text-dark dark:text-light mt-3 max-w-[85ch]">
              Detalji čine razliku. Od dubinskog čišćenja do poliranja i
              zaštite, u 4D Detailingu svakom vozilu pristupamo s istom pažnjom
              kao da je naše vlastito.
              <br />
              <br />
              Dopustite nam da vratimo vašem automobilu svježinu, sjaj i osjećaj
              novog.
              <br />
              <br />
              Niste sigurni što je potrebno vašem vozilu? Javite nam se — rado
              ćemo vam preporučiti najbolju opciju.
              <br />
              <br />
              Rezervirajte svoj termin i prepustite svoje vozilo u naše ruke.
            </p>
            <Button variant="primary" to="/kontakt" className="mt-6">
              Rezerviraj termin
            </Button>
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
