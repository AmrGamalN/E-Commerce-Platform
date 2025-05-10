"use client";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/context/lib/utils";
import { switchStyles } from "./classNames";

interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, "onChange"> {
  label?: string;
  className?: string;
  onCheckedChange?: (checked: boolean) => void; 
  name: string;
  checked: boolean;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void; 
  error?: string; // Add error prop for validation messages
  touched?: boolean; // Add touched prop for Formik
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, label, name, checked, onCheckedChange, onBlur, error, touched, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2 cursor-pointer" title={label}>
          <SwitchPrimitives.Root
            className={cn(switchStyles.swicthContainer, className)}
            checked={checked} // Controlled by the `checked` prop
            onCheckedChange={onCheckedChange} // Handle state changes
            onBlur={onBlur} 
            name={name} 
            ref={ref}
            {...props}
          >
            <SwitchPrimitives.Thumb className={cn(switchStyles.switchBtn)} />
          </SwitchPrimitives.Root>
          {label && <span className="text-sm font-semibold text-gray-60">{label}</span>}
        </label>
        {/* Display validation error if touched and error exists */}
        {touched && error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
