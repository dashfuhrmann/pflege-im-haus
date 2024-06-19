import A11yAccordion from "@/components/A11yAccordion";
import BoundedFull from "@/components/BoundedFull";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content, RichTextField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageAndAccordionRow`.
 */
export type ImageAndAccordionRowProps =
  SliceComponentProps<Content.ImageAndAccordionRowSlice>;

/**
 * Component for "ImageAndAccordionRow" Slices.
 */

function AccordionContent(props: { content: RichTextField }) {
  return (
    <div id="content" className="p-4 font-medium text-lg leading-relaxed">
      <RichTextWithComponents richText={props.content} />
    </div>
  );
}

const ImageAndAccordionRow = ({
  slice,
}: ImageAndAccordionRowProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white flex-col"
    >
      <div className="w-full text-center text-black">
        <RichTextWithComponents richText={slice.primary.heading} />
      </div>
      <div className="w-full text-center text-black">
        <RichTextWithComponents richText={slice.primary.subheading} />
      </div>

      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-4">
        <div className="flex flex-col w-full md:w-[40%] gap-4">
          {slice.items.map((item, index) => (
            <A11yAccordion
              key={index}
              id="test"
              title={item.heading_richtext}
              content={AccordionContent({ content: item.description })}
              initalOpen={index === 0}
            />
          ))}
        </div>
        <div className="flex w-full md:w-[60%] justify-center align-middle flex-grow-0">
          <div className="flex">
            <PrismicNextImage
              layout="responsive"
              width={slice.primary.image.dimensions?.width}
              height={slice.primary.image.dimensions?.height}
              field={slice.primary.image}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </BoundedFull>
  );
};

export default ImageAndAccordionRow;
