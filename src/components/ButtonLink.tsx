import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export default function ButtonLink({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        "relative inline-flex h-fit w-fit rounded-lg text-white px-6 py-3 bg-dunkelblau",
        className
      )}
      {...restProps}
    />
  );
}
