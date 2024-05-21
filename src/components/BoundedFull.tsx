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
      className={clsx("flex w-full h-full p-24 gap-8", className)}
      style={styles}
      {...restProps}
    >
      {children}
    </Comp>
  );
}
