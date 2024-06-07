"use client";

import { KeyTextField, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import React, { ReactNode, useRef, useState } from "react";
import { Colors } from "@/colors";

type AccordionProps = {
  id: string;
  title: KeyTextField;
  content: ReactNode;
  initalOpen?: boolean;
};

function AccordionTitle(props: { heading: KeyTextField; isOpen: boolean }) {
  return (
    <div
      className={`flex w-full flex-row gap-4 justify-between p-4 items-center ${props.isOpen ? "border-2 border-black rounded-t-2xl border-b-0" : "border-2 border-black rounded-2xl"}`}
    >
      <span className="text-3xl font-semibold">{props.heading}</span>
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
  const { id, title, content, initalOpen } = props;

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
    >
      <h3>
        <button
          type="button"
          style={{ width: "100%", borderBottom: "none" }}
          aria-expanded={true}
          aria-controls="section-1"
          id={id}
          onClick={setOpenState}
          onKeyDown={handleKeyDown}
        >
          <AccordionTitle heading={title} isOpen={isOpen} />
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
        className={`${isOpen ? "border-2 border-black rounded-b-2xl border-t-0" : ""}`}
        ref={contentRef}
      >
        {content}
      </div>
    </div>
  );
}

export default A11yAccordion;
