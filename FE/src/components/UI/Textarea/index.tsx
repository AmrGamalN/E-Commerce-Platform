"use client";
import * as React from "react";
import { cn } from "@/context/lib/utils";
import { textareaStyles } from "./classNames";
import { HandleError } from "@/utils/HandleError";
import { useEffect } from "react";
interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  id: string;
  error?: string;
  touched?: boolean;
  mandatory?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}
const MAX_LENGTH = 500;
const Textarea = ({
  id,
  className,
  label,
  error,
  touched,
  mandatory,
  maxLength = MAX_LENGTH,
  showCharCount = true,
  value = "", // Default to empty string
  onChange,
  ...props
}: TextareaProps) => {
  const [charCount, setCharCount] = React.useState(maxLength - String(value).length);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= maxLength) {
      setCharCount(maxLength - newValue.length);
      if (onChange) {
        onChange(event);
      }
    }
  };

  // Sync charCount when value changes (e.g., on reset)
  useEffect(() => {
    setCharCount(maxLength - String(value).length);
  }, [value, maxLength]);

  return (
    <div className="w-full">
      <label htmlFor={id} className="flex flex-row items-center mb-1 gap-1 text-sm font-semibold text-gray-60">
        {label}
        {mandatory && <span className="text-red-500 text-md">*</span>}
      </label>
      <div className="relative">
        <textarea
          className={cn(
            textareaStyles,
            "resize-none w-full pr-4 border rounded-lg",
            error && touched ? "border-red-500" : "border-gray-300 focus:border-gray-500",
            className,
          )}
          value={value}
          onChange={handleChange}
          {...props}
          cols={20}
          rows={4}
        />
        {showCharCount && (
          <span className={cn("absolute bottom-2 right-2 text-sm", charCount === 0 ? "text-red-500" : "text-gray-50")}>
            {charCount} characters available
          </span>
        )}
      </div>
      {error && touched && <HandleError error={error} />}
    </div>
  );
};

Textarea.displayName = "Textarea";

export { Textarea };
