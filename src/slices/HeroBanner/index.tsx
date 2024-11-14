import { ColorsMap } from "@/colors";
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
      <div className="flex relative w-full max-h-[600px]">
        <PrismicNextImage
          field={slice.primary.image}
          className="object-cover"
        />
        <div
          className={`hidden p-4 md:flex absolute items-center top-[50%] translate-x-[-50%] translate-y-[-50%] ${slice.variation === "default" && "max-w-[50%]"} ${(slice.variation === "textLeft" || slice.variation === "textRight") && "max-w-[35%]"}  ${slice.variation === "default" && "left-[50%]"} ${slice.variation === "textLeft" && "left-[17.5%]"} ${slice.variation === "textRight" && "left-[75%]"} flex flex-col gap-4`}
        >
          <div
            className={`text-white text-center`}
            style={{
              color: ColorsMap[slice.primary.text_color] || ColorsMap.default,
            }}
          >
            <RichTextWithComponents richText={slice.primary.heading_richtext} />
          </div>
          <span className="w-20 h-2 rounded-full bg-dunkelblau" />
          <div
            className="max-w-full text-center text-white"
            style={{
              color: ColorsMap[slice.primary.text_color] || ColorsMap.default,
            }}
          >
            <RichTextWithComponents
              richText={slice.primary.subheading_richtext}
            />
          </div>
          {slice.primary.scroll_button ? (
            <ScrollButton
              className="text-2xl text-center text-white text-balance bg-primary"
              elementId={slice.primary.scroll_target as string}
            >
              {slice.primary.link_label}
            </ScrollButton>
          ) : (
            isFilled.keyText(slice.primary.link_label) && (
              <ButtonLink
                className="text-2xl text-center text-white bg-primary text-balance"
                field={slice.primary.link}
              >
                {slice.primary.link_label}
              </ButtonLink>
            )
          )}
        </div>
      </div>

      {/* <BoundedFull className="flex flex-col items-center gap-4 text-center bg-white md:hidden">
        <div className="font-bold">
          <RichTextWithComponents richText={slice.primary.heading_richtext} />
        </div>
        <div>
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
      </BoundedFull> */}
    </section>
  );
};

export default HeroBanner;
