import { ColorsMap } from "@/colors";
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
      styles={{
        backgroundColor:
          ColorsMap[slice.primary.backgroundcolor] || ColorsMap.default,
      }}
    >
      <div className="relative flex items-center justify-center w-full">
        <PrismicNextImage field={slice.primary.image} />
      </div>
    </BoundedFull>
  );
};

export default FullWidthImage;
