import BoundedFull from "@/components/BoundedFull";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FiMail, FiPhone, FiPrinter } from "react-icons/fi";

/**
 * Props for `EmbededGoogleMaps`.
 */
export type EmbededGoogleMapsProps =
  SliceComponentProps<Content.EmbededGoogleMapsSlice>;

/**
 * Component for "EmbededGoogleMaps" Slices.
 */
const EmbededGoogleMaps = ({ slice }: EmbededGoogleMapsProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-[450px] bg-secondary50"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-8">
          <RichTextWithComponents richText={slice.primary.heading} />
          <RichTextWithComponents richText={slice.primary.subheading} />
          <RichTextWithComponents richText={slice.primary.address} />
          <ul className="flex flex-col flex-wrap gap-y-4 gap-x-4">
            <li className="flex flex-row gap-4 items-center">
              <div className="flex p-4 rounded-full bg-primary">
                <FiPhone size={24} color="white" />
              </div>
              <RichTextWithComponents richText={slice.primary.phone} />
            </li>
            <li className="flex flex-row gap-4  items-center">
              <div className="flex p-4 rounded-full bg-primary">
                <FiPrinter size={24} color="white" />
              </div>

              <RichTextWithComponents richText={slice.primary.fax} />
            </li>
            <li className="flex flex-row gap-4 items-center">
              <div className="flex p-4 rounded-full bg-primary">
                <FiMail size={24} color="white" />
              </div>
              <RichTextWithComponents richText={slice.primary.email} />
            </li>
          </ul>
          <RichTextWithComponents richText={slice.primary.opening_hours} />
        </div>
        <div className="flex w-full">
          <iframe
            width={600}
            height={450}
            src="https://www.google.com/maps/embed/v1/place?q=34593+Nenterörder+Kirchweg+9&key=AIzaSyBYLn7rJWS_BdBLGJD6mO0gpiNZV0HMB0g"
          ></iframe>
        </div>
      </div>
    </BoundedFull>
  );
};

export default EmbededGoogleMaps;
