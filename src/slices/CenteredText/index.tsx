import { ColorsMap } from "@/colors";
import BoundedFull from "@/components/BoundedFull";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `CenteredText`.
 */
export type CenteredTextProps = SliceComponentProps<Content.CenteredTextSlice>;

/**
 * Component for "CenteredText" Slices.
 */
const CenteredText = ({ slice }: CenteredTextProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex-col ${slice.primary.backgroundcolor === "primary" ? "text-white" : "text-black"}`}
      styles={{
        backgroundColor:
          ColorsMap[slice.primary.backgroundcolor] || ColorsMap.default,
      }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-6">
          <RichTextWithComponents richText={slice.primary.heading_richtext} />
          <RichTextWithComponents
            richText={slice.primary.subheading_richtext}
          />
        </div>

        <div
          className={`text-balance text-lg leading-relaxed text-start mt-8 ${slice.variation === "withoutBorder" ? null : "border-l-4 border-dunkelblau pl-8"}`}
        >
          <RichTextWithComponents richText={slice.primary.text} />
        </div>
      </div>
    </BoundedFull>
  );
};

export default CenteredText;
