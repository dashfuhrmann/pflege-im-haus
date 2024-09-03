"use client";

import { PrismicColors, PrismicColorsType } from "@/colors";
import { RichTextField } from "@prismicio/client";
import { useRef } from "react";
import RichTextWithComponents from "./RichTextWithComponents";

const Chevron = ({ className }: { className: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`fill-black stroke-black`}
    >
      <path
        d="M12 1.5V22.5"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
        className={`${className} transition-transform duration-250 ease-linear origin-center`}
      ></path>
      <path
        d="M1.5 12H22.5"
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
  open?: boolean;
};

function Accordion({
  headline,
  content,
  backgroundColor = "default",
  open = false,
}: AccordionProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  //   const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
  //     const details = event.target as HTMLDetailsElement;
  //     const content = details.querySelector(".details-content") as HTMLElement;
  //     if (details.open) {
  //       content.style.maxHeight = content.scrollHeight + "px";
  //     } else {
  //       content.style.maxHeight = "0";
  //     }
  //   };

  //   const handleTransitionEnd = (event: React.TransitionEvent<HTMLElement>) => {
  //     const details = detailsRef.current;
  //     if (details === null) return;
  //     const content = details.querySelector(".details-content") as HTMLElement;

  //     if (!details.open) {
  //       content.style.maxHeight = "0";
  //     }
  //   };

  return (
    <details
      className="flex flex-col w-full p-4 rounded-xl group"
      style={{
        backgroundColor:
          PrismicColors[backgroundColor] || PrismicColors.default,
        color: backgroundColor === "primary" ? "white" : "black",
      }}
      ref={detailsRef}
      open={open}
    >
      <summary className="flex flex-row items-center justify-between p-2">
        <div>
          <RichTextWithComponents richText={headline} />
        </div>
        <Chevron className="group-open:rotate-90" />
      </summary>
      <div className="flex flex-col p-2 mt-4 overflow-hidden leading-relaxed ease-linear details-content transition-maxHeight duration-250 max-h-0 group-open:max-h-full">
        <RichTextWithComponents richText={content} />
      </div>
    </details>
  );
}

export default Accordion;
