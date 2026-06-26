"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type ReactNode } from "react";

type CarouselProps = {
  children: ReactNode[];
  itemsPerSlide?: number;
  className?: string;
  slideClassName?: string;
};

function chunkItems<T>(items: T[], size: number): T[][] {
  const slides: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    slides.push(items.slice(index, index + size));
  }

  return slides;
}

export default function Carousel({
  children,
  itemsPerSlide = 2,
  className = "h-80",
  slideClassName = "",
}: CarouselProps) {
  const slides = chunkItems(children, itemsPerSlide);
  const [activeIndex, setActiveIndex] = useState(0);

  if (slides.length === 0) {
    return null;
  }

  const goToSlide = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, slides.length - 1)));
  };

  const isPrevDisabled = activeIndex === 0;
  const isNextDisabled = activeIndex === slides.length - 1;

  return (
    <div className="relative w-full">
      <div className={`carousel overflow-hidden ${className}`}>
        <div
          className="carousel-body flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slideItems, slideIndex) => (
            <div
              key={slideIndex}
              className={`carousel-slide min-w-full shrink-0 ${slideIndex === activeIndex ? "active" : ""}`}
            >
              <div
                className={`grid h-full grid-cols-2 gap-4 ${slideClassName}`}
              >
                {slideItems.map((item, itemIndex) => (
                  <div key={itemIndex} className="min-w-0">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goToSlide(activeIndex - 1)}
            disabled={isPrevDisabled}
            className="cursor-pointer carousel-prev absolute start-3 top-1/2 flex size-9.5 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-sm disabled:opacity-50 sm:start-5"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => goToSlide(activeIndex + 1)}
            disabled={isNextDisabled}
            className="cursor-pointer carousel-next absolute end-3 top-1/2 flex size-9.5 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-sm disabled:opacity-50 sm:end-5"
            aria-label="Next slide"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>

          <div className="carousel-pagination absolute inset-x-0 bottom-3 flex justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`carousel-box size-2.5 rounded-full transition-colors ${
                  index === activeIndex ? "bg-gray-900" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
