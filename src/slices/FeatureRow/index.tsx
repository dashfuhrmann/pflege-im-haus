import { Content } from "@prismicio/client";

import { SliceComponentProps } from "@prismicio/react";
import community from "../../public/community.svg";
import healthcare from "../../public/healthcare.svg";
import competence from "../../public/competence.svg";
import networking from "../../public/networking.svg";
import BoundedFull from "@/components/BoundedFull";
import Image from "next/image";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { PrismicNextImage } from "@prismicio/next";
import { ColorsMap, ColorsType } from "@/colors";

const icons = {
  community: community,
  healthcare: healthcare,
  competence: competence,
  networking: networking,
};

/**
 * Props for `FeatureRow`.
 */
export type FeatureRowProps = SliceComponentProps<Content.FeatureRowSlice>;

/**
 * Component for "FeatureRow" Slices.
 */
const FeatureRow = ({ slice }: FeatureRowProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex-col"
    >
      <span className="w-full text-center">
        <RichTextWithComponents richText={slice.primary.heading} />
      </span>
      <ul className="flex flex-col md:flex-row w-full gap-4">
        {slice.items.map((card, index) => (
          <li
            className="flex flex-col w-full md:w-1/4 gap-4 p-6 items-center"
            key={index}
          >
            <div
              style={{
                backgroundColor:
                  ColorsMap[slice.primary.icon_backround_color] ||
                  ColorsMap.default,
              }}
              className={`flex justify-center rounded-full h-[160px] w-[160px] items-center`}
            >
              {card.icon && (
                <PrismicNextImage
                  width={100}
                  height={100}
                  className="flex-grow-1"
                  field={card.icon}
                />
              )}
            </div>
            <div className=" text-black text-center">
              <RichTextWithComponents richText={card.heading} />
            </div>
            <div className="text-center">
              <RichTextWithComponents richText={card.description} />
            </div>
          </li>
        ))}
      </ul>
    </BoundedFull>
  );
};

export default FeatureRow;
