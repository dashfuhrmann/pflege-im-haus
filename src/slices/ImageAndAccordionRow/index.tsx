import { ColorsMap } from "@/colors";
import Accordion from "@/components/Accordion";
import BoundedFull from "@/components/BoundedFull";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageAndAccordionRow`.
 */
export type ImageAndAccordionRowProps =
  SliceComponentProps<Content.ImageAndAccordionRowSlice>;

/**
 * Component for "ImageAndAccordionRow" Slices.
 */

const ImageAndAccordionRow = ({
  slice,
}: ImageAndAccordionRowProps): JSX.Element => {
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
      <div className="w-full text-center">
        <RichTextWithComponents richText={slice.primary.heading} />
      </div>
      <div className="w-full mb-4 text-center">
        <RichTextWithComponents richText={slice.primary.subheading} />
      </div>

      <div className="flex flex-col items-start lg:flex-row md:gap-4">
        <div className="flex flex-col w-full lg:w-[40%] gap-4">
          {slice.items.map((item, index) => (
            <Accordion
              key={index}
              headline={item.heading_richtext}
              content={item.description}
              backgroundColor={slice.primary.item_color}
              open={index === 0}
            />
          ))}
        </div>
        <div className="flex w-full mt-4 md:mt-0 lg:w-[60%] justify-center align-middle flex-grow-0">
          <div className="flex">
            <PrismicNextImage
              field={slice.primary.image}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </BoundedFull>
  );
};

export default ImageAndAccordionRow;
