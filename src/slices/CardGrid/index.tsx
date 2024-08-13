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
      className="flex-col bg-gray-200 bg-opacity-50 md:flex-row"
    >
      <div className="flex flex-col justify-end w-full gap-4 p-24 mt-auto mb-auto md:w-1/2">
        <div className="text-3xl font-bold text-center">
          <RichTextWithComponents richText={slice.primary.heading_richtext} />
        </div>
        <div className="text-lg text-center">
          <RichTextWithComponents richText={slice.primary.description} />
        </div>
        <div className="flex-shrink-0 bg-gray-200 mx-auto rounded-full h-[240px] w-[240px] p-4">
          <PrismicNextImage
            field={slice.primary.main_image}
            width={240}
            height={240}
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 md:w-1/2 gap-y-8 gap-x-12">
        {slice.items.map((testemonial, index) => (
          <div
            className="flex flex-col justify-center w-full gap-4 p-8 border-2 border-black rounded-2xl"
            key={index}
          >
            <div className="items-center justify-center flex-shrink-0 p-4 mx-auto bg-gray-200 rounded-full">
              <PrismicNextImage
                field={testemonial.image}
                width={64}
                height={64}
              />
            </div>
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
