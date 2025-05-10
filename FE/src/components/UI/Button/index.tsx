import React, { ReactNode, forwardRef } from "react";
import { getButtonStyles, variantStyles } from "./classNames";
import { ImSpinner8 } from "react-icons/im";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineSmsFailed } from "react-icons/md";

type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: keyof typeof variantStyles;
  disabled?: boolean;
  submitStatus?: "loading" | "success" | "error" | "idle"; // Status
  ariaLabel?: string;
  name?: string;
  size?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      name = "",
      className = "",
      type = "button",
      disabled = false,
      variant,
      submitStatus = "idle",
      ariaLabel,
    },
    ref,
  ) => {
    const combinedStyles = getButtonStyles(className, variant, submitStatus);

    return (
      <button
        type={type}
        name={name}
        className={combinedStyles}
        onClick={onClick}
        disabled={disabled || submitStatus === "loading"} // Disable when loading
        aria-disabled={disabled || submitStatus === "loading"}
        aria-label={ariaLabel}
        ref={ref}
      >
        {/* Show status icon + text OR default content */}
        {submitStatus === "loading" ? (
          <span className="flex items-center gap-2">
            <ImSpinner8 size={18} className="animate-spin" />
          </span>
        ) : submitStatus === "success" ? (
          <span className="flex items-center gap-1 ">
            <IoCheckmark size={18} />
            Success
          </span>
        ) : submitStatus === "error" ? (
          <span className="flex items-center gap-2">
            <MdOutlineSmsFailed size={18} />
            Failed
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
