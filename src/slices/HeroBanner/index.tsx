import BoundedFull from "@/components/BoundedFull";
import ButtonLink from "@/components/ButtonLink";
import RichTextWithComponents from "@/components/RichTextWithComponents";
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
    >
      <div className="flex relative w-full max-h-[500px]">
        <PrismicNextImage
          layout="responsive"
          field={slice.primary.image}
          width={slice.primary.image.dimensions?.width}
          height={slice.primary.image.dimensions?.height}
          className="object-cover"
        />
        <div
          className={`absolute items-center top-[50%] translate-x-[-50%] translate-y-[-50%] ${slice.variation === "default" && "left-[50%]"} ${slice.variation === "textLeft" && "left-[25%]"} ${slice.variation === "textRight" && "left-[75%]"} flex flex-col gap-4`}
        >
          <div className="text-white text-center max-w-md">
            <RichTextWithComponents richText={slice.primary.heading_richtext} />
          </div>
          <span className="bg-dunkelblau rounded-full w-20 h-2" />
          <div className="text-white text-center max-w-md">
            <RichTextWithComponents
              richText={slice.primary.subheading_richtext}
            />
          </div>
          {isFilled.keyText(slice.primary.link_label) && (
            <ButtonLink field={slice.primary.link} className="text-lg">
              {slice.primary.link_label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
