import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import React from "react";

const RichTextWithComponents = (props: { richText: RichTextField }) => {
  // use div for each element passd children to the component
  return (
    <PrismicRichText
      field={props.richText}
      components={{
        paragraph: ({ children }) => (
          <p className="text-balance text-lg">{children}</p>
        ),
        heading1: ({ children }) => (
          <h1 className="text-4xl font-bold ">{children}</h1>
        ),
        heading2: ({ children }) => <h2 className="text-3xl">{children}</h2>,
        heading3: ({ children }) => <h3 className="text-2xl">{children}</h3>,
        heading4: ({ children }) => (
          <h4 className="text-xl font-bold">{children}</h4>
        ),
        heading5: ({ children }) => (
          <h5 className="text-lg font-bold">{children}</h5>
        ),
        heading6: ({ children }) => (
          <h6 className="text-base font-bold">{children}</h6>
        ),
        list: ({ children }) => <ol className="list-disc ml-4">{children}</ol>,
        oList: ({ children }) => (
          <ol className="list-decimal ml-4">{children}</ol>
        ),
        oListItem: ({ children }) => <li className="text-lg">{children}</li>,
        listItem: ({ children }) => <li className="text-lg">{children}</li>,
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
