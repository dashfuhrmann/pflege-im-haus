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
      className="flex flex-row bg-white py-8 max-h-[400px] justify-center"
    >
      <div className="flex flex-col md:flex-row w-full gap-4 md:gap-16">
        <div className="flex w-full md:w-1/2 md:max-w-1/2 relative">
          <PrismicNextImage
            field={slice.primary.image}
            className="rounded-2xl"
          />
        </div>
        <div className="flex w-full flex-col justify-center md:w-1/2 md:gap-4 gap-4">
          <div className="w-fit after:block after:h-1 after:bg-secondary after:rounded-xl">
            <RichTextWithComponents richText={slice.primary.heading_richtext} />
          </div>
          <RichTextWithComponents richText={slice.primary.description} />
          <ButtonLink
            field={slice.primary.link}
            className="flex flex-row gap-4 items-center text-2xl bg-secondary text-black"
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
