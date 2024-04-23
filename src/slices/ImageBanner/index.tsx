import BoundedFull from "@/components/BoundedFull";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageBanner`.
 */
export type ImageBannerProps = SliceComponentProps<Content.ImageBannerSlice>;

/**
 * Component for "ImageBanner" Slices.
 */
const ImageBanner = ({ slice }: ImageBannerProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid grid-cols-2 md:flex md:flex-row gap-2 flex-start max-w-screen">
        {slice.items.map((image, index) => (
          <div key={index} className="w-full md:w-1/4 h-[400px]">
            <PrismicNextImage
              field={image.image}
              className="object-cover w-full h-[400px]"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageBanner;
