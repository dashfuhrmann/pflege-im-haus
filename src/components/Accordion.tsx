import React from "react";
import AccordionItem from "./AccordionItem";
import { Content } from "@prismicio/client";

type AccordionItemProps = Content.ImageAndAccordionRowSliceDefaultItem;

function Accordion({ items }: { items: AccordionItemProps[] }) {
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          heading={item.heading}
          description={item.description}
        />
      ))}
    </div>
  );
}

export default Accordion;
