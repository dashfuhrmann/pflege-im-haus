import { Colors } from "@/colors";
import BoundedFull from "@/components/BoundedFull";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

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
      styles={{
        backgroundColor: Colors[slice.primary.backgroundcolor],
      }}
      className={`bg-${slice.primary.backgroundcolor} flex-col`}
      // className={`${slice.primary.backgroundcolor ? Colors[slice.primary.backgroundcolor] : "bg-white"} flex-col`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold">{slice.primary.heading}</h1>
          <h2 className="text-2xl font-semibold">{slice.primary.subheading}</h2>
        </div>

        <div className="text-balance text-lg leading-relaxed border-l-4 text-start mt-8 border-dunkelblau pl-12">
          <PrismicRichText
            field={slice.primary.text}
            components={{
              paragraph: ({ children }) => (
                <p className="text-balance">{children}</p>
              ),
              heading1: ({ children }) => (
                <h1 className="text-4xl font-bold text-balance">{children}</h1>
              ),
              heading2: ({ children }) => (
                <h2 className="text-3xl font-bold text-balance">{children}</h2>
              ),
              heading3: ({ children }) => (
                <h3 className="text-2xl font-bold text-balance">{children}</h3>
              ),
              heading4: ({ children }) => (
                <h4 className="text-xl font-bold text-balance">{children}</h4>
              ),
              heading5: ({ children }) => (
                <h5 className="text-lg font-bold text-balance">{children}</h5>
              ),
              heading6: ({ children }) => (
                <h6 className="text-base font-bold text-balance">{children}</h6>
              ),
              list: ({ children }) => (
                <ol className="list-disc ml-4">{children}</ol>
              ),
              oList: ({ children }) => (
                <ol className="list-decimal ml-4">{children}</ol>
              ),
              oListItem: ({ children }) => (
                <li className="text-balance">{children}</li>
              ),
              listItem: ({ children }) => (
                <li className="text-balance">{children}</li>
              ),
            }}
          />
        </div>
      </div>
    </BoundedFull>
  );
};

export default CenteredText;
