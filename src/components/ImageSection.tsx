import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import React from "react";

import * as Icons from "react-icons/fi";
import ipad from "../public/ipad.svg";
import mobility from "../public/mobility.svg";
import solarPanel from "../public/solarPanel.svg";
import Image from "next/image";

const icons = {
  ipad: ipad,
  mobility: mobility,
  solarPanel: solarPanel,
};

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
        <ul className="flex flex-col gap-4">
          {items.map((item, index) => (
            <li key={index} className="flex flex-row items-center gap-4">
              {item.icon && (
                <Image
                  width={64}
                  height={64}
                  src={icons[item.icon as keyof typeof icons].src}
                  alt="icon"
                />
              )}
              <span className="text-xl">{item.icon_description}</span>
            </li>
          ))}
        </ul>
        {isFilled.link(buttonLink) && (
          <button className="rounded-3xl bg-black text-white w-full p-4">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

export default ImageSection;
