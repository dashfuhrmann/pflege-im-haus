import BoundedFull from "@/components/BoundedFull";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TimeLine`.
 */
export type TimeLineProps = SliceComponentProps<Content.TimeLineSlice>;

/**
 * Component for "TimeLine" Slices.
 */
const TimeLine = ({ slice }: TimeLineProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="container flex flex-col w-full h-full xl:flex-row">
        <div className="flex flex-col w-full gap-4 xl:w-2/5">
          <div className="text-center">
            <RichTextWithComponents richText={slice.primary.heading} />
          </div>
          <div className="text-center">
            <RichTextWithComponents richText={slice.primary.description} />
          </div>
          <div className="flex-shrink-0 mx-auto rounded-full h-[240px] w-[240px]">
            <PrismicNextImage
              field={slice.primary.image}
              width={240}
              height={240}
            />
          </div>
        </div>

        <div className="relative w-full h-full p-10 overflow-hidden wrap xl:w-3/5">
          {/* <div
            className="absolute h-full border-2 border-black border-opacity-20"
            style={{ left: "50%" }}
          ></div> */}
          {slice.items.map((item, index) => (
            <div
              key={index}
              className={`relative flex justify-between items-start w-full flex-row ${
                index % 2 === 0 ? "xl:flex-row" : "xl:flex-row-reverse"
              }`}
            >
              <div className="order-1 hidden w-5/12 xl:block"></div>
              <div className="z-20 flex flex-col items-center order-1">
                <span className="flex items-center justify-center w-8 h-8 text-lg font-semibold text-center text-white rounded-full bg-primary">
                  {index + 1}
                </span>

                {slice.items.length - 1 !== index ? (
                  <div className="absolute mt-8 h-[calc(100%-32px)] w-1 bg-black"></div>
                ) : null}
              </div>
              <div className="order-1 w-full px-6 py-4 mb-4 ml-4 rounded-lg shadow-xl bg-secondary xl:w-5/12 xl:m-0">
                <div className="mb-3 text-black">
                  <RichTextWithComponents richText={item.heading_richtext} />
                </div>
                <div className="leading-snug tracking-wide text-black text-opacity-100">
                  <RichTextWithComponents richText={item.text} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BoundedFull>
  );
};

export default TimeLine;
