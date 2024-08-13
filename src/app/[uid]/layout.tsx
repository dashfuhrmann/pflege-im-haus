import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { createClient, repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { notFound } from "next/navigation";

const dm_sans = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

interface LayoutProps {
  children: React.ReactNode;
  params: { uid: string };
}

export async function generateMetadata({
  params,
}: {
  params: { uid: string };
}): Promise<Metadata & { jsonLd: string }> {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());

  return {
    title: "Betreuungskräfte (m/w/d) in Vollzeit gesucht",
    description: "Betreuungskräfte (m/w/d) in Vollzeit gesucht.",
    jsonLd: JSON.stringify(page.data.structured_data),
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const metadata = await generateMetadata({ params });
  return (
    <html lang="en" className={dm_sans.variable}>
      <head>
        {metadata?.jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: metadata.jsonLd }}
          />
        )}
      </head>

      <body className="bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
