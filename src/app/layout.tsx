import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const dm_sans = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
