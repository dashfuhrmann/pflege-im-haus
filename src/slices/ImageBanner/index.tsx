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
      {/* <div className="grid grid-cols-1 gap-2 md:grid-cols-2 flex-start max-w-screen">
        {slice.items.map((image, index) => (
          <div key={index} className={`w-full h-[400px] relative flex`}>
            <PrismicNextImage field={image.image} />
          </div>
        ))}
      </div> */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {slice.items.map((item, index) => (
          <div
            key={index}
            className={`w-full ${index % 2 !== 0 ? "hidden md:hidden lg:block xl:block" : ""}`}
          >
            <PrismicNextImage field={item.image} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageBanner;
