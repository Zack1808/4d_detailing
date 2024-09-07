import { useEffect, useState, useMemo } from "react";

import { Header, ImageCard, Modal, ImageSlider } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Gallery.css";

const Gallery = ({ resetScroll }) => {
  const [allImages, setAllImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selected, setSelected] = useState({ title: "title", images: [] });

  const handleClick = (index) => {
    setSelected(allImages[index]);
    setModalIsOpen(true);
  };

  useEffect(() => {
    resetScroll();

    fetch("/meta.json")
      .then((response) => response.json())
      .then((data) => setAllImages(data));
  }, [resetScroll]);

  const imageCards = useMemo(() => {
    return allImages.map((image, index) => (
      <ImageCard
        title={image.title}
        image={image.images[0]}
        key={index}
        onClick={() => handleClick(index)}
      />
    ));
  }, [allImages, handleClick]);

  return (
    <>
      <Header title="Galerija" />
      <div className="gallery-container">
        <div className="gallery-content">
          <h2>Galerija</h2>
          <p>
            Pogledajte neke od naših najboljih projekata. Ovim fotografijama
            želimo pokazati kvalitetu naših usluga.
          </p>
        </div>
        <div className="gallery-images">{imageCards}</div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        toggleModal={setModalIsOpen}
        title={`${selected.title} - slike`}
      >
        <ImageSlider images={selected.images} reset={modalIsOpen} />
      </Modal>
    </>
  );
};

export default transition(Gallery);
