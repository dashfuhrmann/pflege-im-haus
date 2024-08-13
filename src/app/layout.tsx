import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
