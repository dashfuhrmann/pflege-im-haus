import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import React from "react";

const RichTextWithComponents = (props: { richText: RichTextField }) => {
  // use div for each element passd children to the component
  return (
    <PrismicRichText
      field={props.richText}
      components={{
        paragraph: ({ children }) => <p className="text-sm md:text-base">{children}</p>,
        heading1: ({ children }) => <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">{children}</h1>,
        heading2: ({ children }) => <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">{children}</h2>,
        heading3: ({ children }) => <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl">{children}</h3>,
        heading4: ({ children }) => <h4 className="text-base md:text-lg lg:text-xl xl:text-2xl">{children}</h4>,
        heading5: ({ children }) => (
          <h5 className="text-base md:text-lg lg:text-xl xl:text-xl">{children}</h5>
        ),
        heading6: ({ children }) => <h6 className="text-lg">{children}</h6>,
        list: ({ children }) => <ol className="list-disc ml-4">{children}</ol>,
        oList: ({ children }) => (
          <ol className="list-decimal ml-4">{children}</ol>
        ),
        oListItem: ({ children }) => (
          <li className="text-lg leading-loose">{children}</li>
        ),
        listItem: ({ children }) => (
          <li className="text-lg leading-loose">{children}</li>
        ),
        hyperlink: ({ children, node }) => (
          <a
            className="underline"
            href={node.data.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
      }}
    />
  );
};

export default RichTextWithComponents;
