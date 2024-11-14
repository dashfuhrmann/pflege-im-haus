import BoundedFull from "@/components/BoundedFull";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `CardGrid`.
 */
export type CardGridProps = SliceComponentProps<Content.CardGridSlice>;

/**
 * Component for "CardGrid" Slices.
 */
const CardGrid = ({ slice }: CardGridProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex-col bg-gray-200 bg-opacity-50 lg:flex-row"
    >
      <div className="flex flex-col justify-end w-full gap-4 mt-auto mb-auto lg:w-1/2">
        <div className="text-3xl font-bold text-center">
          <RichTextWithComponents richText={slice.primary.heading_richtext} />
        </div>
        <div className="text-lg text-center">
          <RichTextWithComponents richText={slice.primary.description} />
        </div>
        <div className="flex-shrink-0 items-center justify-center flex mx-auto rounded-full h-[240px] w-[240px]">
          <PrismicNextImage
            field={slice.primary.main_image}
            width={240}
            height={240}
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 lg:w-1/2 gap-y-8 gap-x-12">
        {slice.items.map((testemonial, index) => (
          <div
            className="flex flex-col items-center justify-center w-full gap-4 p-8 border-2 border-black rounded-2xl"
            key={index}
          >
            {slice.variation === "noBackgroundImage" && (
              <div className="flex items-center justify-center lg:h-[200px] lg:w-[200px] md:w-[180px] md:h-[180px] h-[160px] w-[160px] rounded-full">
                {testemonial.image && (
                  <PrismicNextImage field={testemonial.image} />
                )}
              </div>
            )}
            {slice.variation === "default" && (
              <div className="items-center justify-center flex-shrink-0 p-4 mx-auto bg-gray-200 rounded-full  lg:h-[200px] lg:w-[200px] md:w-[180px] md:h-[180px] h-[160px] w-[160px]">
                <PrismicNextImage field={testemonial.image} />
              </div>
            )}

            <div className="text-center">
              <RichTextWithComponents richText={testemonial.name_richtext} />
            </div>
            <div className="text-lg text-center">
              <RichTextWithComponents richText={testemonial.quote} />
            </div>
          </div>
        ))}
      </div>
    </BoundedFull>
  );
};

export default CardGrid;
