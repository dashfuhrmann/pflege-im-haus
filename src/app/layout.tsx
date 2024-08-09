import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";

const dm_sans = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

interface LayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={dm_sans.variable}>
      <body className="bg-white">
        <main>{children}</main>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
