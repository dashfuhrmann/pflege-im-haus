import BoundedFull from "@/components/BoundedFull";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content, ImageField, RichTextField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

const ImageAndText = (props: {
  image: ImageField;
  heading: String;
  startDate: RichTextField;
}) => {
  return (
    <div className="flex flex-row w-full gap-4 p-4 rounded-lg bg-secondary">
      <div className="flex flex-row items-center justify-center flex-shrink-0 my-auto bg-white rounded-full max-w-16 max-h-16">
        <PrismicNextImage field={props.image} className="p-3" />
      </div>
      <div className="flex flex-col my-auto text-white">
        <span className="text-xl text-bold">{props.heading}</span>
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
      className="flex-col gap-8 bg-white lg:gap-12"
    >
      <RichTextWithComponents richText={slice.primary.title_richtext} />
      <div className="flex flex-col gap-4 md:flex-row">
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
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
