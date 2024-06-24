import { Colors } from "@/colors";
import BoundedFull from "@/components/BoundedFull";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import RichTextWithComponents from "@/components/RichTextWithComponents";

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
      className={`bg-${slice.primary.backgroundcolor} bg-opacity-50 flex-col`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-2">
          <RichTextWithComponents richText={slice.primary.heading_richtext} />
          <RichTextWithComponents
            richText={slice.primary.subheading_richtext}
          />
        </div>

        <div className="text-balance text-lg leading-relaxed border-l-4 text-start mt-8 border-dunkelblau pl-12">
          <RichTextWithComponents richText={slice.primary.text} />
        </div>
      </div>
    </BoundedFull>
  );
};

export default CenteredText;
