import BoundedFull from "@/components/BoundedFull";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import machineLearning from "../../public/machineLearning.svg";
import socialCare from "../../public/socialCare.svg";
import research from "../../public/research.svg";
import education from "../../public/education.svg";
import gloves from "../../public/gloves.svg";
import injection from "../../public/injection.svg";
import report from "../../public/report.svg";
import stethoscope from "../../public/stethoscope.svg";
import Image from "next/image";
import RichTextWithComponents from "@/components/RichTextWithComponents";

const icons = {
  education: education,
  machineLearning: machineLearning,
  socialCare: socialCare,
  research: research,
  gloves: gloves,
  injection: injection,
  report: report,
  stethosscope: stethoscope,
};

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
      <div className="w-full text-center text-6xl">
        <PrismicRichText field={slice.primary.heading} />
      </div>
      <div className="w-full text-center text-3xl text-gray-700">
        <PrismicRichText field={slice.primary.subheading} />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2">
        {slice.items.map((item, index) => (
          <li
            className="flex flex-row w-full items-center gap-4 p-4"
            key={index}
          >
            <div className="flex justify-center bg-gray-200 rounded-full h-[160px] min-w-[160px] items-center">
              {item.icon && (
                <Image
                  width={120}
                  height={120}
                  className="flex-grow-1 mx-auto p-4"
                  src={icons[item.icon as keyof typeof icons]}
                  alt="icon"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-gray-500 text-left">
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
