import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/context/lib/utils";
import { checkBoxstyles } from "./classNames";

interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "onChange"> {
  label?: string;
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>, // Ref type
  CheckboxProps // Props type
>(({ label, className, disabled, onCheckedChange, ...props }, ref) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(checkBoxstyles.checkBox, className)}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn(checkBoxstyles.checkBoxIndicator)}>
          <Check className="h-4 w-4 " />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={props.id} // Associate label with checkbox for accessibility
          className={checkBoxstyles.labelStyle}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
