import { Content } from "@prismicio/client";

import { ColorsMap } from "@/colors";
import BoundedFull from "@/components/BoundedFull";
import { MotionLi } from "@/components/MotionLi";
import { MotionUl } from "@/components/MotionUL";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FeatureRow`.
 */
export type FeatureRowProps = SliceComponentProps<Content.FeatureRowSlice>;

/**
 * Component for "FeatureRow" Slices.
 */
const FeatureRow = ({ slice }: FeatureRowProps): JSX.Element => {
  // Variants for the parent container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Delay between each child animation
      },
    },
  };

  // Variants for each item in the list
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex-col ${slice.primary.background_color === "primary" ? "text-white" : "text-black"}`}
      styles={{
        backgroundColor:
          ColorsMap[slice.primary.background_color] || ColorsMap.default,
      }}
      id="feature-row"
    >
      <span className="w-full text-center">
        <RichTextWithComponents richText={slice.primary.heading} />
      </span>
      <MotionUl
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col w-full gap-4 xl:flex-row"
      >
        {slice.items.map((card, index) => (
          <MotionLi
            variants={itemVariants}
            className="flex flex-col items-center w-full gap-4 p-6 xl:w-1/4"
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
            <div className="text-center text-black ">
              <RichTextWithComponents richText={card.heading} />
            </div>
            <div className="text-center">
              <RichTextWithComponents richText={card.description} />
            </div>
          </MotionLi>
        ))}
      </MotionUl>
    </BoundedFull>
  );
};

export default FeatureRow;
