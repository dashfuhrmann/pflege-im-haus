"use client";

import React, { useRef, useState } from "react";

type AccordionProps = {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  isOpenCallback: (isOpen: boolean) => void;
};

function A11yAccordion(props: AccordionProps) {
  const { id, title, content, isOpenCallback } = props;

  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const setOpenState = () => {
    if (isOpen) {
      setIsOpen(false);
      isOpenCallback(false);
    } else {
      setIsOpen(true);
      isOpenCallback(true);
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
          style={{ width: "100%" }}
          aria-expanded={true}
          aria-controls="section-1"
          id={id}
          onClick={setOpenState}
          onKeyDown={handleKeyDown}
        >
          {title}
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
      >
        {content}
      </div>
    </div>
  );
}

export default A11yAccordion;
