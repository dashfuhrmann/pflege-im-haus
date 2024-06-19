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
      className="bg-gray-200 flex-col"
    >
      <RichTextWithComponents richText={slice.primary.heading} />
      {slice.items.map((item, index) => (
        <A11yAccordion
          id="accordion"
          key={index}
          title={item.heading}
          content={AccordionContent({ content: item.content })}
          backgroundColor="bg-white"
        />
      ))}
    </BoundedFull>
  );
};

export default FullWidthAccordion;
