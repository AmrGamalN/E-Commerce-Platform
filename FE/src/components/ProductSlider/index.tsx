"use client";
import { useState, useEffect, useCallback } from "react";
import { CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../UI/Carousel";
import cn from "classnames";
import Image from "next/image";
import { ProductSliderStyles } from "./classNames";
import MagnifyImage from "../MagnifyImage";

type ProductSliderProps = {
  Images: string[];
  angles: string[] | undefined;
  className?: string;
};

const ProductSlider = ({ Images, className, angles }: ProductSliderProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const onSelect = useCallback(() => {
    if (api) {
      setCurrentSlide(api.selectedScrollSnap());
    }
  }, [api]);
  useEffect(() => {
    if (api) {
      onSelect();
      api.on("select", onSelect);
      api.on("reInit", onSelect);
      return () => {
        api.off("select", onSelect);
        api.off("reInit", onSelect);
      };
    }
  }, [api, onSelect]);
  return (
    <div className={cn(ProductSliderStyles.container, className)}>
      {/* Big Image Carousel */}
      {Images?.length > 0 ? (
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Carousel setApi={setApi} opts={{ align: "start", loop: true }}>
            <>
              <CarouselContent className="flex ">
                {Images?.map((img, index) => (
                  <CarouselItem key={index} className="w-full flex-shrink-0 relative ">
                    <div className={ProductSliderStyles.bigImg}>
                      <MagnifyImage
                        key={`img-${index}`}
                        src={img}
                        angle={angles?.[index] ?? ""}
                        alt={`img${index}`}
                        magnifierSize={150}
                        zoomLevel={2.5}
                        containerClassName="relative w-full h-96"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Thumbnails */}
              <div className="relative py-4">
                <CarouselPrevious className={`${ProductSliderStyles.carsualBtn} left-1`} />
                <CarouselNext className={`${ProductSliderStyles.carsualBtn}  right-1`} />

                <div className="flex justify-center gap-2 md:gap-2">
                  {Images?.map((img, index) => {
                    const isActive = currentSlide === index;
                    return (
                      <div
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`${ProductSliderStyles.imgBlock} ${
                          isActive ? "border-2 border-green-30" : ""
                        } cursor-pointer transition-shadow duration-300   rounded-lg`}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            api?.scrollTo(index);
                          }
                        }}
                        aria-label={`Scroll to slide ${index + 1}`}
                      >
                        {img ? (
                          <Image
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover p-1 rounded-lg overflow-hidden"
                            priority={isActive}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-lg" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          </Carousel>
        </div>
      ) : (
        // placeholder
        <div className="w-full h-96 bg-gray-20 animate-pulse rounded-lg"></div>
      )}
    </div>
  );
};

export default ProductSlider;
