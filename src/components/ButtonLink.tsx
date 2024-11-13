import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export default function ButtonLink({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        "relative flex h-fit w-fit rounded-lg px-3 md:px-6 py-2 md:py-3 hover:scale-105 transition-transform duration-200 ease-in-out",
        className
      )}
      {...restProps}
    />
  );
}
