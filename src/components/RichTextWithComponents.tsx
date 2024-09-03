import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

const RichTextWithComponents = (props: { richText: RichTextField }) => {
  // use div for each element passd children to the component
  return (
    <PrismicRichText
      field={props.richText}
      components={{
        paragraph: ({ children }) => (
          <p className="text-sm md:text-base xl:text-lg">{children}</p>
        ),
        heading1: ({ children }) => (
          <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl">
            {children}
          </h1>
        ),
        heading2: ({ children }) => (
          <h2 className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl">
            {children}
          </h2>
        ),
        heading3: ({ children }) => (
          <h3 className="text-xl md:text-xl lg:text-2xl xl:text-3xl">
            {children}
          </h3>
        ),
        heading4: ({ children }) => (
          <h4 className="text-lg md:text-lg lg:text-xl xl:text-2xl">
            {children}
          </h4>
        ),
        heading5: ({ children }) => (
          <h5 className="text-sm md:text-md lg:text-lg xl:text-xl">
            {children}
          </h5>
        ),
        heading6: ({ children }) => <h6 className="text-lg">{children}</h6>,
        list: ({ children }) => (
          <ol className="ml-4 text-sm list-disc md:text-base xl:text-lg">
            {children}
          </ol>
        ),
        oList: ({ children }) => (
          <ol className="ml-4 text-sm list-decimal md:text-base xl:text-lg">
            {children}
          </ol>
        ),
        oListItem: ({ children }) => (
          <li className="text-sm leading-loose md:text-base xl:text-lg">
            {children}
          </li>
        ),
        listItem: ({ children }) => (
          <li className="text-sm leading-loose md:text-base xl:text-lg">
            {children}
          </li>
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
