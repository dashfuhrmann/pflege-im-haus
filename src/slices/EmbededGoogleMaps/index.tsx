import BoundedFull from "@/components/BoundedFull";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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
    >
      <iframe
        width="600"
        height="450"
        Loading="lazy"
        allowfullscreen
        src="https://www.google.com/maps/embed/v1/place?q=34593+Nenterörder+Kirchweg+9&key=AIzaSyBYLn7rJWS_BdBLGJD6mO0gpiNZV0HMB0g"
      ></iframe>
    </BoundedFull>
  );
};

export default EmbededGoogleMaps;
