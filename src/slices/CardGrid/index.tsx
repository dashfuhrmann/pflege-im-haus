import BoundedFull from "@/components/BoundedFull";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

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
      className="bg-gray-200 bg-opacity-50 flex-col md:flex-row"
    >
      <div className="flex flex-col w-full md:w-1/2 justify-end p-24 mb-auto mt-auto gap-4">
        <h1 className="font-bold text-3xl text-center">
          <>{slice.primary.heading}</>
        </h1>
        <div className="text-lg text-center">
          <PrismicRichText field={slice.primary.description} />
        </div>
        <div className="flex-shrink-0 bg-gray-200 mx-auto rounded-full h-[240px] w-[240px] p-4">
          <PrismicNextImage
            field={slice.primary.main_image}
            width={240}
            height={240}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-1/2 gap-y-8 gap-x-12">
        {slice.items.map((testemonial, index) => (
          <div
            className="flex flex-col w-full gap-4 justify-center border-2 rounded-2xl border-black p-8"
            key={index}
          >
            <div className="flex-shrink-0 bg-gray-200 mx-auto rounded-full p-4 items-center justify-center">
              <PrismicNextImage
                field={testemonial.image}
                width={64}
                height={64}
              />
            </div>
            <h1 className="text-xl text-center">{testemonial.name}</h1>
            <div className="text-lg text-center">
              <PrismicRichText field={testemonial.quote} />
            </div>
          </div>
        ))}
      </div>
    </BoundedFull>
  );
};

export default CardGrid;
