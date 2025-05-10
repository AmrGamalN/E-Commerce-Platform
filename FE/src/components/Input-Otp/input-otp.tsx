"use client";
import { ElementRef, forwardRef, ComponentPropsWithoutRef } from "react";
import { OTPInput } from "input-otp";
import { Minus } from "lucide-react";
import { cn } from "@/context/lib/utils";
import { InputOTPStyles } from "./classNames";

// InputOTP Wrapper
const InputOTP = forwardRef<ElementRef<typeof OTPInput>, ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, ...props }, ref) => (
    <OTPInput ref={ref} className={cn("flex items-center gap-2 has-[:disabled]:opacity-50", className)} {...props} />
  ),
);
InputOTP.displayName = "InputOTP";

// Group Wrapper
const InputOTPGroup = forwardRef<ElementRef<"div">, ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center rounded-lg gap-2", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

// Single Slot
const InputOTPSlot = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div"> & {
    index: number;
    codeStatus: boolean;
    slotData: {
      char: string | null;
      placeholderChar: string | null;
      hasFakeCaret: boolean;
      isActive: boolean;
    };
  }
>(({ index, slotData, codeStatus, className, ...props }, ref) => {
  if (!slotData) {
    console.error(`Slot at index ${index} is undefined`);
    return null;
  }
  const { char, hasFakeCaret, isActive } = slotData;

  return (
    <div
      ref={ref}
      className={cn(
        InputOTPStyles.container,
        isActive ? "z-10 border-gray-60" : "border-gray-40",
        codeStatus === true ? "border-red-600" : "",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className={InputOTPStyles.hasFakeCaretStyleParent}>
          <div className="h-4 w-px animate-caret-blink duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

// Separator (Optional)
const InputOTPSeparator = forwardRef<ElementRef<"div">, ComponentPropsWithoutRef<"div">>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

// Export all
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
