"use client";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import React from "react";
import { Plus } from "react-icons/fi";

type AccordionItemProps = Content.ImageAndAccordionRowSliceDefaultItem;

function AccordionItem(props: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [drawerHeight, setDrawerHeight] = React.useState(0);

  //write a function that over 500ms adds 50px per 100ms startiung from 0
  function heightFunction() {
    setIsOpen(!isOpen);
    if (!isOpen) {
      let height = 0;
      for (let i = 0; i <= 250; i += 50) {
        height += 50;
        setDrawerHeight(height);
      }
    } else {
      let height = 250;
      for (let i = 250; i > 0; i -= 50) {
        height -= 50;
        setDrawerHeight(height);
      }
    }
  }

  return (
    <div
      className={`border-2 border-black rounded-3xl -mb-[2px]`}
      onClick={() => {
        heightFunction();
      }}
    >
      <div className="flex flex-row justify-between p-4 items-center">
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
              transform: isOpen ? "rotate(90deg)" : undefined,
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
        {/* <Plus /> */}
      </div>
      <div
        id="content"
        style={{
          transition: "max-height 350ms linear",
          maxHeight: drawerHeight,
          overflow: "hidden",
        }}
      >
        <div
          className="p-4"
          style={
            {
              // visibility: isOpen ? 'visible' : 'hidden',
              // transition: isOpen ? 'visibility 100ms linear 200ms' : 'visibility 100ms linear 200ms',
            }
          }
        >
          <PrismicRichText field={props.description} />
        </div>
      </div>
    </div>
  );
}

export default AccordionItem;
