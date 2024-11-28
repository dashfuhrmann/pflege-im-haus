import { Metadata } from "next";

import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    icons: [
      {
        url: "/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID("page", "home");

  const jsonLd = JSON.stringify(home.data.structured_data);

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <SliceZone slices={home.data.slices} components={components} />
    </section>
  );
}
