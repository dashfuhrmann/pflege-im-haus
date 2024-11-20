"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import React from "react";

type MotionLiProps = HTMLMotionProps<"li">;

export const MotionLi = React.forwardRef<HTMLLIElement, MotionLiProps>(
  function MotionLi({ children, ...props }, ref) {
    return (
      <motion.li ref={ref} {...props}>
        {children}
      </motion.li>
    );
  }
);
