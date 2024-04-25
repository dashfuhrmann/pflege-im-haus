"use client";
import { Content, KeyTextField, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import React from "react";
import A11yAccordion from "./A11yAccordion";

type AccordionItemProps = Content.ImageAndAccordionRowSliceDefaultItem;

function AccordionTitle(props: { heading: KeyTextField; isOpen: boolean }) {
  return (
    <div className="flex w-full flex-row justify-between p-4 items-center border-2 border-black rounded-3xl">
      <h1 className="text-3xl text-bold">{props.heading}</h1>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="black"
        stroke="black"
      >
        <path
          d="M8 1V15"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
          style={{
            transform: props.isOpen ? "rotate(90deg)" : undefined,
            transition: "transform 350ms linear",
            transformOrigin: "center",
          }}
        ></path>
        <path
          d="M1 8H15"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  );
}

function AccordionContent(props: { description: RichTextField }) {
  return (
    <div id="content" className="border-2 border-black rounded-3xl p-4">
      <PrismicRichText
        field={props.description}
        components={{
          list: ({ children }) => (
            <ol className="list-disc ml-4">{children}</ol>
          ),
          oList: ({ children }) => (
            <ol className="list-decimal ml-4">{children}</ol>
          ),
          oListItem: ({ children }) => (
            <li className="text-balance">{children}</li>
          ),
          listItem: ({ children }) => (
            <li className="text-balance">{children}</li>
          ),
        }}
      />
    </div>
  );
}

function AccordionItem(props: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <A11yAccordion
      title={AccordionTitle({ heading: props.heading, isOpen })}
      content={AccordionContent({ description: props.description })}
      isOpenCallback={setIsOpen}
      id="an-accordion"
    />
  );
}

export default AccordionItem;
