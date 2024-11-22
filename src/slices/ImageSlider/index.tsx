"use client";

import ButtonLink from "@/components/ButtonLink";
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
    }, 6000);

    return () => clearInterval(intervalId);
  }, [currentIndex, slice.items.length]);

  console.log(slice.items[currentIndex].button_link, "link");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hidden lg:flex"
    >
      <div className="flex flex-col w-full h-[600px] relative">
        <div
          className={`absolute text-center items-center ${slice.variation === "default" && "left-[17.5%] top-[25%] translate-x-[-17.5%] translate-y-[-25%]"} ${slice.variation === "textBottom" && "left-[12.5%] top-[50%] translate-x-[-12.5%] translate-y-[-50%]"} ${slice.variation === "textCenter" && "left-[25%] top-[50%] translate-x-[-25%] translate-y-[-25%]"} z-10 gap-4 flex flex-col`}
        >
          {isFilled.richText(slice.primary.title_richtext) && (
            <div className="text-white">
              <RichTextWithComponents richText={slice.primary.title_richtext} />
            </div>
          )}

          {isFilled.richText(slice.items[currentIndex].sub_heading_1) && (
            <div className="max-w-md text-white">
              <RichTextWithComponents
                richText={slice.items[currentIndex].sub_heading_1}
              />
            </div>
          )}

          {isFilled.richText(slice.items[currentIndex].sub_heading_2) && (
            <div className="max-w-md text-white">
              <RichTextWithComponents
                richText={slice.items[currentIndex].sub_heading_2}
              />
            </div>
          )}
          {isFilled.richText(slice.items[currentIndex].sub_heading_3) && (
            <div className="max-w-md text-white">
              <RichTextWithComponents
                richText={slice.items[currentIndex].sub_heading_3}
              />
            </div>
          )}

          {isFilled.keyText(slice.items[currentIndex].button_label) && (
            <ButtonLink
              field={slice.items[currentIndex].button_link}
              className="w-1/2 py-2 text-xl text-center text-white rounded-xl bg-secondary"
            >
              {slice.items[currentIndex].button_label}
            </ButtonLink>
          )}
        </div>
        {slice.items.map((item, index) => (
          <div
            key={index}
            className={`w-full h-[600px] absolute transition-opacity duration-[2000ms] ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <PrismicNextImage
              field={item.image}
              className="relative w-full h-[600px] object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageSlider;
