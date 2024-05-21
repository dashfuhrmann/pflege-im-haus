import React from "react";
import AccordionItem from "./AccordionItem";
import { Content } from "@prismicio/client";
import A11yAccordion from "./A11yAccordion";

type AccordionItemProps = Content.ImageAndAccordionRowSliceDefaultItem;

function Accordion({ items }: { items: AccordionItemProps[] }) {
  return (
    <div>
      {items.map((item, index) => (
        <A11yAccordion
          id="test"
          key={index}
          title={item.heading}
          content={item.description}
        />
      ))}
    </div>
  );
}

export default Accordion;
