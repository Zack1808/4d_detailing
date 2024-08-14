import { useEffect, useState } from "react";

import { Header, ImageCard } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Gallery.css";

const Gallery = ({ resetScroll }) => {
  const [allImages, setAllImages] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const handleClick = (index) => {
    setSelectedCollection(index);
  };

  useEffect(() => {
    resetScroll();

    fetch("/meta.json")
      .then((response) => response.json())
      .then((data) => setAllImages(data));
  }, []);

  return (
    <>
      <Header title="Galerija" />
      <div className="gallery-container">
        <div className="gallery-content">
          <h2>Galerija</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore
            natus impedit, at obcaecati cum porro delectus velit placeat eos rem
            sunt ipsa. Quaerat minima quis repudiandae? Consectetur ducimus
            provident velit obcaecati quo voluptatibus ea nulla inventore, a
            iste, sint tenetur voluptate! Molestias nisi a laudantium sapiente,
            mollitia ut odit illum.
          </p>
        </div>
        <div className="gallery-images">
          {allImages.map((image, index) => (
            <ImageCard
              title={image.title}
              image={image.images[0]}
              key={index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default transition(Gallery);
