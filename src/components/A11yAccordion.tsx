"use client";

import { RichTextField } from "@prismicio/client";
import React, { ReactNode, useRef, useState } from "react";
import RichTextWithComponents from "./RichTextWithComponents";

type AccordionProps = {
  id: string;
  title: RichTextField | string;
  content: ReactNode;
  initalOpen?: boolean;
  backgroundColor?: string;
  noBorder?: boolean;
};

function AccordionTitle(props: {
  heading: RichTextField | string;
  isOpen: boolean;
  backgroundColor?: string;
}) {
  return (
    <div
      className={`flex w-full flex-row gap-4 justify-between rounded-2xl p-4 items-center transition-all ${props.isOpen ? "rounded-b-none" : ""} ${props.backgroundColor}`}
    >
      {typeof props.heading === "string" ? (
        <span>{props.heading}</span>
      ) : (
        <span className="text-left">
          <RichTextWithComponents richText={props.heading} />
        </span>
      )}
      {/* <span className="text-left">
        <RichTextWithComponents richText={props.heading} />
      </span> */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        className="fill-black stroke-black"
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

function A11yAccordion(props: AccordionProps) {
  const { id, title, content, initalOpen, backgroundColor } = props;

  const [isOpen, setIsOpen] = useState(initalOpen || false);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const setOpenState = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpenState();
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
      }}
      className={`${props.noBorder ? "border-none" : "border-2 border-black rounded-2xl transition-all"}`}
    >
      <h3>
        <button
          type="button"
          style={{ width: "100%" }}
          aria-expanded={true}
          aria-controls="section-1"
          id={id}
          onClick={setOpenState}
          onKeyDown={handleKeyDown}
        >
          <AccordionTitle
            heading={title}
            isOpen={isOpen}
            backgroundColor={backgroundColor}
          />
        </button>
      </h3>
      <div
        role="region"
        aria-labelledby={id}
        id="section-1"
        style={{
          overflow: "hidden",
          height: isOpen ? contentRef.current?.scrollHeight : 0,
          transition: "height 0.3s",
        }}
        ref={contentRef}
        className="rounded-b-2xl"
      >
        {content}
      </div>
    </div>
  );
}

export default A11yAccordion;
