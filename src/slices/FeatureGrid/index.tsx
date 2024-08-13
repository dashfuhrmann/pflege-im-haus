import { ColorsMap } from "@/colors";
import BoundedFull from "@/components/BoundedFull";
import ButtonLink from "@/components/ButtonLink";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { FiArrowRight } from "react-icons/fi";

/**
 * Props for `FeatureGrid`.
 */
export type FeatureGridProps = SliceComponentProps<Content.FeatureGridSlice>;

/**
 * Component for "FeatureGrid" Slices.
 */
const FeatureGrid = ({ slice }: FeatureGridProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex-col ${slice.primary.background_color === "primary" ? "text-white" : "text-black"}`}
      styles={{
        backgroundColor:
          ColorsMap[slice.primary.background_color] || ColorsMap.default,
      }}
    >
      <div className="w-full text-center">
        <RichTextWithComponents richText={slice.primary.heading} />
      </div>
      <div className="w-full text-center">
        <RichTextWithComponents richText={slice.primary.subheading} />
      </div>
      <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-4">
        {slice.items.map((item, index) => (
          <li className="flex flex-row flex-wrap w-full gap-4 p-8" key={index}>
            {slice.variation === "noBackgroundImages" && (
              <div className="flex items-center justify-center min-h-[280px] min-w-[280px] rounded-full w-full">
                {item.icon && (
                  <PrismicNextImage
                    width={280}
                    height={280}
                    className="flex-grow-0"
                    field={item.icon}
                  />
                )}
              </div>
            )}
            {slice.variation === "default" && (
              <div className="flex justify-center bg-gray-200 rounded-full h-[160px] min-w-[160px] items-center">
                {item.icon && (
                  <PrismicNextImage
                    width={120}
                    height={120}
                    className="p-4 mx-auto flex-grow-1"
                    field={item.icon}
                  />
                )}
              </div>
            )}
            <div className="flex flex-col gap-4">
              <div className="text-left text-black">
                <RichTextWithComponents richText={item.heading} />
              </div>
              <div className="text-left">
                <RichTextWithComponents richText={item.description} />
              </div>
              {isFilled.link(item.link) && (
                <ButtonLink
                  field={item.link}
                  className="flex flex-row items-center gap-4 mt-auto text-2xl text-white bg-secondary hover:bg-secondary50 "
                >
                  {item.link_label}
                  <FiArrowRight />
                </ButtonLink>
              )}
            </div>
          </li>
        ))}
      </ul>
    </BoundedFull>
  );
};

export default FeatureGrid;
