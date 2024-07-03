import { ColorsMap } from "@/colors";
import BoundedFull from "@/components/BoundedFull";
import ImageSection from "@/components/ImageSection";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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
      className={`flex-col ${slice.primary.backgroundcolor === "primary" ? "text-white" : "text-black"}`}
      styles={{
        backgroundColor:
          ColorsMap[slice.primary.backgroundcolor] || ColorsMap.default,
      }}
    >
      <div className="w-full text-center break-words">
        <RichTextWithComponents richText={slice.primary.heading} />{" "}
      </div>
      <div className="w-full text-center">
        <RichTextWithComponents richText={slice.primary.subheading} />
      </div>
      <ImageSection
        items={slice.items}
        image={slice.primary.image}
        cardHeading={slice.primary.card_heading_richtext}
        cardDescription={slice.primary.card_description_richtext}
        buttonText={slice.primary.button_text}
        buttonLink={slice.primary.button_link}
      />
    </BoundedFull>
  );
};

export default ImageAndBulletList;
