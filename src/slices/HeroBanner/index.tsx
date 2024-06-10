import BoundedFull from "@/components/BoundedFull";
import ButtonLink from "@/components/ButtonLink";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `HeroBanner`.
 */
export type HeroBannerProps = SliceComponentProps<Content.HeroBannerSlice>;

/**
 * Component for "HeroBanner" Slices.
 */
const HeroBanner = ({ slice }: HeroBannerProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="h-[500px]"
    >
      <div className="relative w-full h-[500px]">
        <PrismicNextImage
          layout="responsive"
          field={slice.primary.image}
          width={slice.primary.image.dimensions?.width}
          height={slice.primary.image.dimensions?.height}
          className="w-auto h-auto max-w-full max-h-full grayscale-[40%]"
        />
      </div>
      <div className="absolute top-[25%] -translate-y-[25%] w-full flex flex-col justify-center items-center gap-4">
        <h1 className="text-5xl text-white font-bold">
          {slice.primary.heading}
        </h1>
        <span className="bg-dunkelblau rounded-full w-20 h-2" />
        <div className="text-gray-100 font-bold text-3xl text-center max-w-md ">
          {slice.primary.subheading}
        </div>
        {isFilled.keyText(slice.primary.link_label) && (
          <ButtonLink field={slice.primary.link} className="text-lg">
            {slice.primary.link_label}
          </ButtonLink>
        )}
      </div>
    </section>
  );
};

export default HeroBanner;
