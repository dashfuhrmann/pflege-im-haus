import Accordion from "@/components/Accordion";
import BoundedFull from "@/components/BoundedFull";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

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
      className="bg-secondary bg-opacity-50 flex-col"
    >
      <div className="w-full text-center text-6xl text-gray-700">
        <PrismicRichText field={slice.primary.heading} />
      </div>
      <div className="w-full text-center text-3xl text-gray-700">
        <PrismicRichText field={slice.primary.subheading} />
      </div>

      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-0">
        <div className="flex w-full md:w-[40%]">
          <Accordion items={slice.items} />
        </div>
        <div className="flex w-full md:w-[60%] justify-center align-middle flex-grow-0">
          <div className="flex max-h-[80%] max-w-[80%]">
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
