import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import React from "react";
import RichTextWithComponents from "./RichTextWithComponents";

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
  cardHeading: Content.ImageAndBulletListSlice["primary"]["card_heading_richtext"];
  cardDescription: Content.ImageAndBulletListSlice["primary"]["card_description_richtext"];
  buttonText: Content.ImageAndBulletListSlice["primary"]["button_text"];
  buttonLink: Content.ImageAndBulletListSlice["primary"]["button_link"];
}) {
  // map over icons and return an array of feather icons plus the icon text

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4">
      <div className="flex w-full lg:w-1/2">
        <PrismicNextImage
          field={image}
        />
      </div>
      <div className="flex flex-col w-full lg:w-1/2">
        <RichTextWithComponents richText={cardHeading} />
        <div className="mt-4">
          <RichTextWithComponents richText={cardDescription} />
        </div>
        <ul className="flex flex-col gap-8">
          {items.map((item, index) => (
            <li key={index} className="flex flex-row items-center gap-4">
              {item.iconimage && (
                <PrismicNextImage
                  field={item.iconimage}
                  width={64}
                  height={64}
                />
              )}
              {isFilled.richText(item.description) && (
                <RichTextWithComponents richText={item.description} />
              )}
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
