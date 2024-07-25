import { ColorsMap } from "@/colors";
import A11yAccordion from "@/components/A11yAccordion";
import BoundedFull from "@/components/BoundedFull";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content, RichTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FullWidthAccordion`.
 */
export type FullWidthAccordionProps =
  SliceComponentProps<Content.FullWidthAccordionSlice>;

function AccordionContent(props: { content: RichTextField }) {
  return (
    <div
      id="content"
      className="p-4 font-medium text-lg leading-relaxed bg-white"
    >
      <RichTextWithComponents richText={props.content} />
    </div>
  );
}

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
        <A11yAccordion
          id="accordion"
          key={index}
          title={item.heading_richtext}
          content={AccordionContent({ content: item.content })}
          backgroundColor="bg-white"
          noBorder={true}
        />
      ))}
    </BoundedFull>
  );
};

export default FullWidthAccordion;
