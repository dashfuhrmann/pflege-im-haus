import { Colors } from "@/colors";
import BoundedFull from "@/components/BoundedFull";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FullWidthImage`.
 */
export type FullWidthImageProps =
  SliceComponentProps<Content.FullWidthImageSlice>;

/**
 * Component for "FullWidthImage" Slices.
 */

const FullWidthImage = ({ slice }: FullWidthImageProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${slice.primary.backgroundcolor ? Colors[slice.primary.backgroundcolor] : "bg-white"}`}
    >
      <PrismicNextImage
        layout="responsive"
        width={slice.primary.image.dimensions?.width}
        height={slice.primary.image.dimensions?.height}
        field={slice.primary.image}
        className="rounded-2xl h-[400px] w-full relative"
      />
    </BoundedFull>
  );
};

export default FullWidthImage;
