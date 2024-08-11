import BoundedFull from "@/components/BoundedFull";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content, ImageField, RichTextField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import React from "react";

const ImageAndText = (props: {
  image: ImageField;
  heading: String;
  startDate: RichTextField;
}) => {
  return (
    <div className="flex w-full flex-row gap-4 p-4 bg-secondary rounded-lg">
      <div className="flex flex-row flex-shrink-0 rounded-full bg-white items-center justify-center">
        <PrismicNextImage field={props.image} className="p-3" />
      </div>
      <div className="flex flex-col text-white my-auto">
        <span className="text-bold text-xl">{props.heading}</span>
        <RichTextWithComponents richText={props.startDate} />
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
      className="flex-col bg-white gap-8"
    >
      <RichTextWithComponents richText={slice.primary.title_richtext} />
      <div className="flex flex-col md:flex-row gap-8">
        <ImageAndText
          image={slice.primary.address_image}
          heading={"Arbeitsort:"}
          startDate={slice.primary.address}
        />

        <ImageAndText
          image={slice.primary.working_hours_image}
          heading={"Arbeitszeit:"}
          startDate={slice.primary.working_hours}
        />
        <ImageAndText
          image={slice.primary.start_date_image}
          heading={"Startdatum:"}
          startDate={slice.primary.start_date_richtext}
        />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-12 p-8">
        {slice.items.map((item, index) => (
          <li key={index} className="flex flex-col gap-4">
            <RichTextWithComponents richText={item.description} />
          </li>
        ))}
      </ul>
    </BoundedFull>
  );
};

export default ApplicationCard;
