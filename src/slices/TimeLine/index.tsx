import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import BoundedFull from "@/components/BoundedFull";

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
      <div className="container w-full h-full">
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div
            className="border-2 absolute border-opacity-20 border-gray-700 h-full"
            style={{ left: "50%" }}
          ></div>
          {slice.items.map((item, index) => (
            <div
              key={index}
              className={`mb-8 flex justify-between items-center w-full ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">
                  {index + 1}
                </h1>
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
