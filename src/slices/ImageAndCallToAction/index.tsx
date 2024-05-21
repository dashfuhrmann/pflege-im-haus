import BoundedFull from "@/components/BoundedFull";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FiArrowRight } from "react-icons/fi";

/**
 * Props for `ImageAndCallToAction`.
 */
export type ImageAndCallToActionProps =
  SliceComponentProps<Content.ImageAndCallToActionSlice>;

/**
 * Component for "ImageAndCallToAction" Slices.
 */
const ImageAndCallToAction = ({
  slice,
}: ImageAndCallToActionProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-row bg-white"
    >
      <div className="flex flex-col md:flex-row w-full gap-4 md:gap-0">
        <div className="flex w-full md:w-1/2 md:max-w-1/2">
          <PrismicNextImage
            layout="responsive"
            width={slice.primary.image.dimensions?.width}
            height={slice.primary.image.dimensions?.height}
            field={slice.primary.image}
            className="rounded-2xl object-cover h-[400px] w-full relative"
          />
        </div>
        <div className="flex w-full flex-col md:w-1/2 md:justify-between md:gap-0 gap-4 pl-12 pr-12">
          <h3 className="w-fit text-3xl font-bold after:block after:h-1 after:bg-secondary after:rounded-xl">
            {slice.primary.heading}
          </h3>
          <div className="text-5xl text-balance">
            <PrismicRichText field={slice.primary.description} />
          </div>
          <PrismicNextLink
            field={slice.primary.link}
            className="flex flex-row gap-4 text-2xl text-secondary items-center hover:underline hover:underline-offset-1 hover:decoration-secondary"
          >
            {slice.primary.link_label}
            <FiArrowRight />
          </PrismicNextLink>
        </div>
      </div>
    </BoundedFull>
  );
};

export default ImageAndCallToAction;
