import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import React from "react";

const RichTextWithComponents = (props: { richText: RichTextField }) => {
  return (
    <PrismicRichText
      field={props.richText}
      components={{
        paragraph: ({ children }) => (
          <p className="text-balance text-lg">{children}</p>
        ),
        heading1: ({ children }) => (
          <h1 className="text-4xl font-bold text-balance">{children}</h1>
        ),
        heading2: ({ children }) => (
          <h2 className="text-3xl font-bold text-balance">{children}</h2>
        ),
        heading3: ({ children }) => (
          <h3 className="text-2xl font-bold text-balance">{children}</h3>
        ),
        heading4: ({ children }) => (
          <h4 className="text-xl font-bold text-balance">{children}</h4>
        ),
        heading5: ({ children }) => (
          <h5 className="text-lg font-bold text-balance">{children}</h5>
        ),
        heading6: ({ children }) => (
          <h6 className="text-base font-bold text-balance">{children}</h6>
        ),
        list: ({ children }) => <ol className="list-disc ml-12">{children}</ol>,
        oList: ({ children }) => (
          <ol className="list-decimal ml-12">{children}</ol>
        ),
        oListItem: ({ children }) => (
          <li className="text-balance marker:text-secondary text-lg">
            {children}
          </li>
        ),
        listItem: ({ children }) => (
          <li className="text-balance marker:text-secondary text-lg">
            {children}
          </li>
        ),
      }}
    />
  );
};

export default RichTextWithComponents;
