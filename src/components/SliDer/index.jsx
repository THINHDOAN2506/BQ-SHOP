import React, { useState } from "react";
import "./style.scss";
import { ImagesData } from "./ImagesData";
import { FcPrevious, FcNext } from "react-icons/fc";

const SliDer = ({ slides }) => {
  const [currentSlides, setCurrentSlides] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrentSlides(currentSlides === length - 1 ? 0 : currentSlides + 1);
  };
  const preSlide = () => {
    setCurrentSlides(currentSlides === 0 ? length - 1 : currentSlides - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <FcPrevious className="slider-image__pre" onClick={preSlide} />
      <FcNext className="slider-image__next" onClick={nextSlide} />
      {ImagesData.map((slide, index) => {
        return (
          <div
            className={index === currentSlides ? "slide active" : "slide"}
            key={index}
          >
            {index === currentSlides && (
              <img
                src={slide.image}
                alt="travel img"
                className="slider-image"
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
        );
      })}
    </section>
  );
};
export default SliDer;
