import BoundedFull from "@/components/BoundedFull";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { PrismicNextImage } from "@prismicio/next";

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
      className="bg-secondary flex-col"
    >
      <div className="w-full text-center">
        <RichTextWithComponents richText={slice.primary.heading} />
      </div>
      <div className="w-full text-center">
        <RichTextWithComponents richText={slice.primary.subheading} />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2">
        {slice.items.map((item, index) => (
          <li className="flex flex-row w-full gap-4 p-4" key={index}>
            {slice.variation === "noBackgroundImages" && (
              <div className="flex items-center justify-center min-h-[280px] min-w-[280px] rounded-full relative">
                {item.icon && (
                  <PrismicNextImage
                    width={280}
                    height={280}
                    className="flex-grow-1"
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
                    className="flex-grow-1 mx-auto p-4"
                    field={item.icon}
                  />
                )}
              </div>
            )}
            <div className="flex flex-col gap-2 flex-grow-0">
              <div className="text-black text-left">
                <RichTextWithComponents richText={item.heading} />
              </div>
              <div className="text-left">
                <RichTextWithComponents richText={item.description} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </BoundedFull>
  );
};

export default FeatureGrid;
