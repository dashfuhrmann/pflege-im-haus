interface LayoutProps {
  children: React.ReactNode;
}

export default async function NestedLayout({ children }: LayoutProps) {
  return <section>{children}</section>;
}
