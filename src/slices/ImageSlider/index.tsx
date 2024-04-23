"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useEffect, useState } from "react";

/**
 * Props for `ImageSlider`.
 */
export type ImageSliderProps = SliceComponentProps<Content.ImageSliderSlice>;

/**
 * Component for "ImageSlider" Slices.
 */
const ImageSlider = ({ slice }: ImageSliderProps): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === slice.items.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex, slice.items.length]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex flex-col w-full h-[800px]">
        <div className="absolute w-full lg:w-1/2 p-32 z-10 gap-4 flex flex-col">
          <h1 className="text-5xl text-white font-bold">
            {slice.primary.title}
          </h1>
          <div className="text-slate-300 text-lg text-balance max-w-md">
            <PrismicRichText field={slice.primary.sub_heading_1} />
          </div>

          <div className="text-slate-300 text-lg text-balance max-w-md">
            <PrismicRichText field={slice.primary.sub_heading_2} />
          </div>
          <div className="text-slate-300 text-lg text-balance max-w-md">
            <PrismicRichText field={slice.primary.sub_heading_3} />
          </div>
          <button className="bg-white py-2 text-xl text-center w-1/2 rounded-xl">
            {slice.primary.button_label}
          </button>
        </div>
        {slice.items.map((item, index) => (
          <div
            key={index}
            className={`w-full h-[800px] absolute transition-opacity duration-[2000ms] ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <PrismicNextImage
              field={item.image}
              className="relative w-full h-[800px] object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageSlider;
