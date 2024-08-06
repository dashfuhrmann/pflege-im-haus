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

const url1 = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS}&q=Nenter%C3%B6rder%20Kirchweg%209%20Kn%C3%BCllwald+()`;
const url2 = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS}&q=August-Vilmar-Stra%C3%9Fe%207%20Homberg%20(Efze)+()`;

const EmbededGoogleMaps = ({ slice }: EmbededGoogleMapsProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-[450px] bg-secondary50 flex-col"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-8">
          <RichTextWithComponents richText={slice.primary.heading} />
          <RichTextWithComponents richText={slice.primary.subheading} />
          <ul className="flex flex-col gap-4">
            {slice.items.map((item, index) => (
              <li key={index}>
                <RichTextWithComponents richText={item.address} />
                {index === 0 && (
                  <RichTextWithComponents
                    richText={slice.primary.opening_hours}
                  />
                )}
              </li>
            ))}
          </ul>
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
        </div>
        <div className="flex flex-col w-full gap-4">
          <iframe
            className="w-full"
            height="400"
            id="gmap_canvas"
            src={url1}
          ></iframe>
          <iframe
            className="w-full"
            height="400"
            id="gmap_canvas"
            src={url2}
          ></iframe>
        </div>
      </div>
    </BoundedFull>
  );
};

export default EmbededGoogleMaps;
