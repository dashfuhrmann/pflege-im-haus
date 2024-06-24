"use client";

import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
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
      <div className="flex flex-col w-full h-[800px] relative">
        <div
          className={`absolute w-full ${slice.variation === "default" && "left-[25%] top-[25%] translate-x-[-25%] translate-y-[-25%]"} ${slice.variation === "textBottom" && "left-[25%] top-[75%] translate-x-[-25%] translate-y-[-75%]"} ${slice.variation === "textCenter" && "left-[25%] top-[50%] translate-x-[-25%] translate-y-[-50%]"} lg:w-1/2  z-10 gap-4 flex flex-col`}
        >
          {isFilled.keyText(slice.primary.title) && (
            <div className="text-white">
              <RichTextWithComponents richText={slice.primary.title_richtext} />
            </div>
          )}

          {isFilled.richText(slice.primary.sub_heading_1) && (
            <div className="text-slate-300 max-w-md">
              <RichTextWithComponents richText={slice.primary.sub_heading_1} />
            </div>
          )}

          {isFilled.richText(slice.primary.sub_heading_2) && (
            <div className="text-slate-300 max-w-md">
              <RichTextWithComponents richText={slice.primary.sub_heading_2} />
            </div>
          )}
          {isFilled.richText(slice.primary.sub_heading_3) && (
            <div className="text-slate-300 max-w-md">
              <RichTextWithComponents richText={slice.primary.sub_heading_3} />
            </div>
          )}

          {isFilled.keyText(slice.primary.button_label) && (
            <button className="bg-white py-2 text-xl text-center w-1/2 rounded-xl">
              {slice.primary.button_label}
            </button>
          )}
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
