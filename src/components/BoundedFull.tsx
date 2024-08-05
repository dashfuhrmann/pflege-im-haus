import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  styles?: React.CSSProperties;
};

export default function BoundedFull({
  as: Comp = "section",
  className,
  children,
  styles,
  ...restProps
}: BoundedProps) {
  return (
    <Comp
      className={clsx("flex w-full h-full px-12 xl:px-24 gap-4 py-8 xl:py-16", className)}
      style={styles}
      {...restProps}
    >
      {children}
    </Comp>
  );
}
