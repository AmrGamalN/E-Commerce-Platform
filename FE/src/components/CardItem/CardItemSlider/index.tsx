import React, { useState } from "react";
import { cardItemStyles } from "../classNames";
import { ImageItem } from "@/types/ImageItem";
import { GrNext, GrPrevious } from "react-icons/gr";

import Image from "next/image";
type CardItemSliderProps = {
  images: ImageItem[];
};
const CardItemSlider = ({ images }: CardItemSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation Handlers
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goToSlide = (index: number) => setCurrentIndex(index);
  return (
    <div className={cardItemStyles.imagesContainer}>
      <div className="w-full h-full relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images?.map((img, index) => (
            <div key={index} className={cardItemStyles.itemImage}>
              <Image
                src={img?.imageUrl || "/assets/images/itemCard/defaultImage.jpg"}
                alt={`Image ${index + 1}`}
                fill
                className="object-contain rounded-lg"
                style={{ transform: `rotate(${img?.rotateDeg || 0}deg)` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className={cardItemStyles.cardNavigateButton + " left-2"}
          >
            <GrPrevious size={14} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next image"
            className={cardItemStyles.cardNavigateButton + " right-2"}
          >
            <GrNext size={14} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      <div className={cardItemStyles.dotsIndicator}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to image ${index + 1}`}
            className={` rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-gray-60   w-3 h-1" : "bg-gray-40 w-2 h-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardItemSlider;
