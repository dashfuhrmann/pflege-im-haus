import BoundedFull from "@/components/BoundedFull";
import ButtonLink from "@/components/ButtonLink";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
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
      className="flex flex-row justify-center py-8 bg-white"
    >
      <div className="flex flex-col w-full gap-4 lg:flex-row lg:gap-16 lg:justify-between lg:max-h-[450px]">
        <div className="relative flex justify-center w-full lg:w-1/2">
          <PrismicNextImage
            field={slice.primary.image}
            className="rounded-2xl"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 we-full lg:w-1/2 lg:gap-4">
          <div className="w-fit">
            <RichTextWithComponents richText={slice.primary.heading_richtext} />
          </div>
          <RichTextWithComponents richText={slice.primary.description} />
          <ButtonLink
            field={slice.primary.link}
            className="flex flex-row items-center gap-4 text-2xl text-black bg-secondary50"
          >
            {slice.primary.link_label}
            <FiArrowRight />
          </ButtonLink>
        </div>
      </div>
    </BoundedFull>
  );
};

export default ImageAndCallToAction;
