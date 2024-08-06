import { useEffect, useState } from "react";

import { Header } from "../components";

import transition from "../helpers/transition";

import "../css/pages/Eksterijer.css";

const imagesToLoad = ["/hero-bg-small.webp"];

const Eksterijer = ({ onLoadingComplete, resetScroll }) => {
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    const handleImageLoaded = () => {
      setImagesLoaded((prevState) => prevState + 1);
    };

    imagesToLoad.forEach((image) => {
      const img = new Image();
      img.src = image;
      img.onload = handleImageLoaded;
      img.onerror = handleImageLoaded;
    });

    resetScroll();
  }, []);

  useEffect(() => {
    if (imagesLoaded < imagesToLoad.length) return;

    onLoadingComplete();
  }, [imagesLoaded]);
  useEffect(() => {
    resetScroll();
  }, []);

  return (
    <>
      <Header title="Čišćenje Eksterijera" />
      <div className="eksterijer-container">
        <div className="eksterijer-content">Hello</div>
      </div>
    </>
  );
};

export default transition(Eksterijer);
