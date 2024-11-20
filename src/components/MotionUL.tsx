"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

type MotionUlProps = HTMLMotionProps<"ul">;

const MotionUl = React.forwardRef<HTMLUListElement, MotionUlProps>(
  function MotionUl({ children, ...props }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
      once: true,
      margin: "0px 50px -50px 0px",
    });
    return (
      <motion.ul ref={ref} {...props} animate={isInView ? "visible" : "hidden"}>
        {children}
      </motion.ul>
    );
  }
);

export { MotionUl };
