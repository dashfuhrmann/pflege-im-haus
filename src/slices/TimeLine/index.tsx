import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import BoundedFull from "@/components/BoundedFull";
import { PrismicNextImage } from "@prismicio/next";

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
      <div className="container w-full h-full flex flex-col md:flex-row">
        <div className="flex flex-col w-full md:w-2/5 gap-4">
          <h1 className="font-bold text-3xl text-center">
            <>{slice.primary.heading}</>
          </h1>
          <div className="text-lg text-center">
            <PrismicRichText field={slice.primary.description} />
          </div>
          <div className="flex-shrink-0 bg-gray-200 mx-auto rounded-full h-[240px] w-[240px] p-4">
            <PrismicNextImage
              field={slice.primary.image}
              width={240}
              height={240}
            />
          </div>
        </div>

        <div className="relative wrap overflow-hidden p-10 h-full w-full md:w-3/5">
          {/* <div
            className="border-2 absolute border-opacity-20 border-gray-700 h-full"
            style={{ left: "50%" }}
          ></div> */}
          {slice.items.map((item, index) => (
            <div
              key={index}
              className={`relative flex justify-between items-start w-full ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex flex-col items-center order-1">
                <span className="flex items-center justify-center text-center font-semibold text-lg text-white bg-primary w-8 h-8 rounded-full">
                  {index + 1}
                </span>

                {slice.items.length - 1 !== index ? (
                  <div className="absolute mt-8 h-[calc(100%-32px)] w-1 bg-gray-700"></div>
                ) : null}
              </div>
              <div className="order-1 bg-secondary rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-gray-900 text-xl">
                  {item.heading}
                </h3>
                <div className="text-lg leading-snug tracking-wide text-gray-900 text-opacity-100">
                  <PrismicRichText field={item.text} />
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
