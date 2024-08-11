"use client";

import clsx from "clsx";
import React from "react";
import { Button } from "react-aria-components";

type ScrollButtonProps = {
  className?: string;
  elementId: string;
  children?: React.ReactNode;
};

function ScrollButton({ className, elementId, children }: ScrollButtonProps) {
  const handleClick = () => {
    if (!elementId) return;
    const element = document.getElementById(elementId);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Button
      className={clsx(
        "relative inline-flex h-fit w-fit rounded-lg text-white px-3 md:px-6  py-2 md:py-3 bg-dunkelblau",
        className
      )}
      onPress={handleClick}
    >
      {children}
    </Button>
  );
}

export default ScrollButton;
