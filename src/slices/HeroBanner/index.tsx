import { ColorsMap } from "@/colors";
import BoundedFull from "@/components/BoundedFull";
import ButtonLink from "@/components/ButtonLink";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import ScrollButton from "@/components/ScrollButton";
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
          field={slice.primary.image}
          className="object-cover"
        />
        <div
          className={`hidden md:flex absolute items-center top-[50%] translate-x-[-50%] translate-y-[-50%] ${slice.variation === "default" && "left-[50%]"} ${slice.variation === "textLeft" && "left-[17.5%]"} ${slice.variation === "textRight" && "left-[75%]"} flex flex-col gap-4`}
        >
          <div
            className="text-white max-w-[30%] text-center"
            style={{
              color: ColorsMap[slice.primary.text_color] || ColorsMap.default,
            }}
          >
            <RichTextWithComponents richText={slice.primary.heading_richtext} />
          </div>
          <span className="bg-dunkelblau rounded-full w-20 h-2" />
          <div
            className="text-white max-w-[50%] text-center"
            style={{
              color: ColorsMap[slice.primary.text_color] || ColorsMap.default,
            }}
          >
            <RichTextWithComponents
              richText={slice.primary.subheading_richtext}
            />
          </div>
          {slice.primary.scroll_button ? (
            <ScrollButton elementId={slice.primary.scroll_target as string}>
              {slice.primary.link_label}
            </ScrollButton>
          ) : (
            isFilled.keyText(slice.primary.link_label) && (
              <ButtonLink field={slice.primary.link} className="text-lg">
                {slice.primary.link_label}
              </ButtonLink>
            )
          )}
        </div>
      </div>

      <BoundedFull className="flex flex-col md:hidden gap-4 p-4 bg-white items-center text-center pb-4">
        <div className="font-bold">
          <RichTextWithComponents richText={slice.primary.heading_richtext} />
        </div>
        {slice.primary.scroll_button ? (
          <ScrollButton elementId={slice.primary.scroll_target as string}>
            {slice.primary.link_label}
          </ScrollButton>
        ) : (
          isFilled.keyText(slice.primary.link_label) && (
            <ButtonLink field={slice.primary.link} className="text-lg">
              {slice.primary.link_label}
            </ButtonLink>
          )
        )}
      </BoundedFull>
    </section>
  );
};

export default HeroBanner;
