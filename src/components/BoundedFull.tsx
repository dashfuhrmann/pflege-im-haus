import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export default function BoundedFull({
  as: Comp = "section",
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Comp
      className={clsx("flex w-full h-full p-24 gap-8", className)}
      {...restProps}
    >
      {children}
    </Comp>
  );
}
