import BoundedFull from "@/components/BoundedFull";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import {
  Content,
  ImageField,
  KeyTextField,
  RichTextField,
} from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import React from "react";

const ImageAndText = (props: {
  image: ImageField;
  heading: String;
  text: RichTextField | KeyTextField;
}) => {
  return (
    <div className="flex w-full flex-row gap-4 p-4 bg-secondary">
      <div className="flex flex-shrink-0 rounded-full bg-white items-center justify-center">
        <PrismicNextImage
          field={props.image}
          width={props.image.dimensions?.width}
          height={props.image.dimensions?.height}
          className="w-20 h-20 p-3"
        />
      </div>
      <div className="flex flex-col text-lg text-white">
        <span>{props.heading}</span>
        {typeof props.text === "string" ? (
          <span>{props.text}</span>
        ) : (
          <PrismicRichText field={props.text} />
        )}
      </div>
    </div>
  );
};

/**
 * Props for `ApplicationCard`.
 */
export type ApplicationCardProps =
  SliceComponentProps<Content.ApplicationCardSlice>;

/**
 * Component for "ApplicationCard" Slices.
 */
const ApplicationCard = ({ slice }: ApplicationCardProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex-col bg-gray-200"
    >
      <h1 className="text-4xl font-bold">{slice.primary.job_title}</h1>
      <div className="flex flex-row gap-8">
        <ImageAndText
          image={slice.primary.address_image}
          heading={"Arbeitsort:"}
          text={slice.primary.address}
        />

        <ImageAndText
          image={slice.primary.working_hours_image}
          heading={"Arbeitszeit:"}
          text={slice.primary.working_hours}
        />
        <ImageAndText
          image={slice.primary.start_date_image}
          heading={"Startdatum:"}
          text={slice.primary.start_date}
        />
      </div>
      <ul className="grid grid-cols-2 gap-6 p-8">
        {slice.items.map((item, index) => (
          <li key={index} className="flex flex-col gap-2">
            <RichTextWithComponents richText={item.description} />
          </li>
        ))}
      </ul>
    </BoundedFull>
  );
};

export default ApplicationCard;
