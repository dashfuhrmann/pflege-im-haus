import { ColorsMap } from "@/colors";
import Accordion from "@/components/Accordion";
import BoundedFull from "@/components/BoundedFull";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FullWidthAccordion`.
 */
export type FullWidthAccordionProps =
  SliceComponentProps<Content.FullWidthAccordionSlice>;
/**
 * Component for "FullWidthAccordion" Slices.
 */
const FullWidthAccordion = ({
  slice,
}: FullWidthAccordionProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex-col ${slice.primary.background_color === "primary" ? "text-white" : "text-black"}`}
      styles={{
        backgroundColor:
          ColorsMap[slice.primary.background_color] || ColorsMap.default,
      }}
    >
      <div className="flex flex-col mb-8">
        <RichTextWithComponents richText={slice.primary.heading} />

        <RichTextWithComponents richText={slice.primary.subheading} />
      </div>
      {slice.items.map((item, index) => (
        <Accordion
          key={index}
          headline={item.heading_richtext}
          content={item.content}
          backgroundColor={slice.primary.item_color}
        />
      ))}
    </BoundedFull>
  );
};

export default FullWidthAccordion;
