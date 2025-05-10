"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toasterStyles } from "./classNames";

type ToasterProps = React.ComponentProps<typeof Sonner> & {
  status?: "success" | "error";
  description?: string;
  theme?: "system" | "dark" | "light";
};

const Toaster = ({ status, description, ...props }: ToasterProps) => {
  const { theme } = useTheme();

  // Ensure `theme` is a string before using `.includes()`
  const validTheme = (["system", "dark", "light"].includes(theme || "") ? theme : "system") as
    | "system"
    | "dark"
    | "light";

useEffect(() => {
  if (!status || !description?.trim()) return;

  const toastOptions = {
    icon:
      status === "success" ? (
        <FaCheckCircle size={20} className="text-green-500" />
      ) : (
        <FaTimesCircle size={20} className="text-red-500" />
      ),
  };

  if (status === "success") {
    toast.success(description, toastOptions);
  } else {
    toast.error(description, toastOptions);
  }
}, [status, description]);

  return (
    <Sonner
      theme={validTheme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: toasterStyles.toastContainerStyles,
          description: "group-[.toaster]:text-muted-foreground text-sm capitalize",
          success: "!bg-green-500 !border-green-600 !text-white",
          error: "!bg-red-500 !border-red-600 !text-white",
        },
      }}
      {...props}
    />
  );
};

export default Toaster;
