import BoundedFull from "@/components/BoundedFull";
import ImageSection from "@/components/ImageSection";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageAndBulletList`.
 */
export type ImageAndBulletListProps =
  SliceComponentProps<Content.ImageAndBulletListSlice>;

/**
 * Component for "ImageAndBulletList" Slices.
 */
const ImageAndBulletList = ({
  slice,
}: ImageAndBulletListProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-secondary bg-opacity-50 flex-col"
    >
      <div className="w-full text-center text-6xl break-words">
        <PrismicRichText field={slice.primary.heading} />{" "}
      </div>
      <div className="w-full text-center text-3xl text-gray-700">
        <PrismicRichText field={slice.primary.subheading} />
      </div>
      <ImageSection
        items={slice.items}
        image={slice.primary.image}
        cardHeading={slice.primary.card_heading}
        cardDescription={slice.primary.card_description}
        buttonText={slice.primary.button_text}
        buttonLink={slice.primary.button_link}
      />
    </BoundedFull>
  );
};

export default ImageAndBulletList;
