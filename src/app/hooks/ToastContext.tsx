import React, { ReactNode, createContext, useRef, useState } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextProps {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  liveRegionRef: React.RefObject<HTMLDivElement>;
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined
);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const liveRegionRef = useRef<HTMLDivElement | null>(null);

  const addToast = (message: string, type: ToastType, duration = 3000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = message;
    }

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = "";
      }
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, liveRegionRef }}>
      {children}
    </ToastContext.Provider>
  );
};
