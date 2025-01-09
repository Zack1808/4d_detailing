import React, { useEffect, useState, useCallback } from "react";

import { Header, CategoryCard, Modal, ImageSlider } from "../components";

import transition from "../helpers/transition";

import { useScrollPosition } from "../context/scrollContext";

import "../css/pages/Gallery.css";

const Gallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState();

  const { resetScroll } = useScrollPosition();

  const galleryItems = [
    {
      to: "/galerija",
      title: "Porsche Cayenne",
      images: [
        "/gallery-images/Porshe_Cayenne_preview.webp",
        "/gallery-images/Porshe_Cayenne_01.webp",
        "/gallery-images/Porshe_Cayenne_02.webp",
        "/gallery-images/Porshe_Cayenne_03.webp",
        "/gallery-images/Porshe_Cayenne_04.webp",
        "/gallery-images/Porshe_Cayenne_05.webp",
      ],
    },
  ];

  useEffect(() => {
    resetScroll();
    const link = document.createElement("link");
    const meta = document.createElement("meta");

    link.rel = "canonical";
    link.href = "https://4d-detailing.hr/galerija";
    document.head.appendChild(link);

    meta.setAttribute("property", "og:url");
    meta.content = "https://4d-detailing.hr/galerija";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(meta);
    };
  }, []);

  const openModal = useCallback(
    (event, index) => {
      event.preventDefault();
      setSelectedGallery(index);
      setModalOpen(true);
    },
    [setSelectedGallery, setModalOpen]
  );

  const closeModal = useCallback(() => setModalOpen(false));

  return (
    <>
      <Header title="Galerija" bgImage="/hero-bg-big.avif" />

      <main className="gallery">
        <article className="container">
          <section>
            <p>
              Pogledajte neke od naših najboljih projekata. Ovim fotografijama
              želimo prikazati kvalitetu naših usluga.
            </p>
          </section>
        </article>

        <article className="container gallery-cards">
          {galleryItems.map((galleryItem, index) => (
            <CategoryCard
              key={`gallery-item-${index + 1}`}
              title={galleryItem.title}
              imageUrl={galleryItem.images[0]}
              style={{ "--transition-delay": `${0.07 * index + 0.3}s` }}
              onClick={(event) => {
                openModal(event, index);
              }}
            />
          ))}
        </article>
      </main>
      <Modal
        isOpen={modalOpen}
        closeModal={closeModal}
        title={galleryItems[selectedGallery]?.title}
        noBg
        full
      >
        {galleryItems[selectedGallery] && (
          <ImageSlider
            images={galleryItems[selectedGallery].images}
            resetGallery={modalOpen}
          />
        )}
      </Modal>
    </>
  );
};

export default transition(Gallery);
