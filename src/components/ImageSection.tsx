import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import React from "react";

import * as Icons from "react-icons/fi";

function ImageSection({
  items,
  image,
  cardHeading,
  cardDescription,
  buttonText,
  buttonLink,
}: {
  items: Content.ImageAndBulletListSlice["items"];
  image: Content.ImageAndBulletListSlice["primary"]["image"];
  cardHeading: Content.ImageAndBulletListSlice["primary"]["card_heading"];
  cardDescription: Content.ImageAndBulletListSlice["primary"]["card_description"];
  buttonText: Content.ImageAndBulletListSlice["primary"]["button_text"];
  buttonLink: Content.ImageAndBulletListSlice["primary"]["button_link"];
}) {
  // map over icons and return an array of feather icons plus the icon text
  const iconsArray = items.map((item, index: number) => {
    const SpecificIcon = Icons[`Fi${item.icon}` as keyof typeof Icons];
    return (
      <div key={index} className="flex flex-row items-center gap-4">
        <SpecificIcon />
        <span className="text-xl">{item.icon_description}</span>
      </div>
    );
  });

  return (
    <div className="flex flex-col md:flex-row w-full gap-4 md:gap-0">
      <div className="flex w-full md:w-1/2">
        <PrismicNextImage
          field={image}
          className="rounded-2xl h-[600px] w-full relative object-cover"
        />
      </div>
      <div className="flex flex-col w-full md:w-1/2 gap-6 md:pl-32 pl-0">
        <h1 className="text-3xl font-bold">{cardHeading}</h1>
        <span className="text-xl mt-4">{cardDescription}</span>
        {iconsArray}
        <button className="rounded-3xl bg-black text-white w-full p-4">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ImageSection;
