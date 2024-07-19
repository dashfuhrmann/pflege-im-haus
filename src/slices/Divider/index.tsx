import BoundedFull from "@/components/BoundedFull";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Divider`.
 */
export type DividerProps = SliceComponentProps<Content.DividerSlice>;

/**
 * Component for "Divider" Slices.
 */
const Divider = ({ slice }: DividerProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-0"
    >
      <hr className="h-1 w-full flex flex-row bg-secondary rounded-2xl"></hr>
    </BoundedFull>
  );
};

export default Divider;
