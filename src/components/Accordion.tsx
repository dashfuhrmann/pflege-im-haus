"use client";

import { RichTextField } from "@prismicio/client";
import React, { useRef, useState } from "react";
import RichTextWithComponents from "./RichTextWithComponents";
import { PrismicColors, PrismicColorsType } from "@/colors";

const Chevron = ({ className }: { className: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`fill-black stroke-black`}
    >
      <path
        d="M8 1V15"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
        className={`${className} transition-transform duration-250 ease-linear origin-center`}
      ></path>
      <path
        d="M1 8H15"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

type AccordionProps = {
  headline: RichTextField;
  content: RichTextField;
  backgroundColor?: PrismicColorsType;
};

function Accordion({
  headline,
  content,
  backgroundColor = "default",
}: AccordionProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
    const details = event.target as HTMLDetailsElement;
    const content = details.querySelector(".details-content") as HTMLElement;
    if (details.open) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = "0";
    }
  };

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLElement>) => {
    const details = detailsRef.current;
    if (details === null) return;
    const content = details.querySelector(".details-content") as HTMLElement;

    if (!details.open) {
      content.style.maxHeight = "0";
    }
  };

  return (
    <details
      className="flex flex-col w-full p-4 rounded-xl group marker:content-none"
      style={{
        backgroundColor:
          PrismicColors[backgroundColor] || PrismicColors.default,
        color: backgroundColor === "primary" ? "white" : "black",
      }}
      ref={detailsRef}
      onToggle={handleToggle}
      onTransitionEnd={handleTransitionEnd}
    >
      <summary className="flex flex-row items-center justify-between">
        <h3 className="">
          <RichTextWithComponents richText={headline} />
        </h3>
        <Chevron className="group-open:rotate-90" />
      </summary>
      <div className="details-content flex leading-relaxed overflow-hidden transition-maxHeight duration-250 ease-linear max-h-0 group-open:max-h-full">
        <RichTextWithComponents richText={content} />
      </div>
    </details>
  );
}

export default Accordion;
