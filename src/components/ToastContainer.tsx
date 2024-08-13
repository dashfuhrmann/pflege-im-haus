"use client";

import { ColorsMap } from "@/colors";
import React from "react";
import { useToast } from "../app/hooks/useToast";

export const ToastContainer: React.FC = () => {
  const { toasts, liveRegionRef } = useToast();

  return (
    <div>
      <div
        ref={liveRegionRef}
        aria-live="assertive"
        aria-atomic="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      ></div>
      <div className="fixed z-[1000] flex flex-col gap-8 bottom-8 right-8">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="p-8 text-xl text-white rounded-lg shadow-md bg-primary"
            style={{
              backgroundColor:
                toast.type === "error" ? "rgb(239 68 68)" : ColorsMap.primary,
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};
