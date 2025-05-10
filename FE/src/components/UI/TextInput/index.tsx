import React, { useState } from "react";
import { getAditionalStyles, TextInputStyles } from "./classNames";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { HandleError } from "@/utils/HandleError";
 

type TextInputProps = {
  label?: string;
  id: string;
  type?: string; // Input type (text, number, email, password, etc.)
  name: string;
  placeholder?: string;
  autocomplete?: string; // for passwordss inputs only make bett Accessibility
  mandatory?: boolean;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
  touched?: boolean;
  readOnly?: boolean;
  minLength?: number; // For password or text validation
  maxLength?: number; // To limit character length
  pattern?: string; // For regex pattern validation
};

const TextInput = ({
  label,
  id,
  type = "text", // Default to "text" if no type is provided
  placeholder,
  mandatory = false,
  value,
  name,
  readOnly,
  onChange,
  onBlur,
  className = "",
  error,
  touched,
  minLength,
  maxLength,
  pattern,
  autocomplete,
}: TextInputProps) => {
  const combinedStyles = getAditionalStyles(className);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className={TextInputStyles.labelStyle}>
          {label}
          {mandatory && <span className="text-red-500 text-md">*</span>}
        </label>
      )}

      {/* Input Field */}
      <div className="relative">
        <input
          id={id}
          type={showPassword && type === "password" ? "text" : type}
          placeholder={placeholder}
          value={value || ""}
          readOnly={readOnly}
          name={name}
          onChange={onChange}
          autoComplete={autocomplete}
          onBlur={onBlur}
          minLength={minLength} // For password or text inputs requiring a min length
          maxLength={maxLength} // To limit character input length
          pattern={pattern} // For regex-based input validation (e.g., email format)
          {...(type === "number" ? { min: 0 } : {})} // Ensure positive numbers for number type
          className={`${error && touched ? TextInputStyles.requiredInputStyle : ""} ${combinedStyles}`}
        />
        {/* Password visibility toggle */}
        {type === "password" && (
          <span className={TextInputStyles.showPassword} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <IoEye /> : <IoEyeOff />}
          </span>
        )}
      </div>

      {/* Error Message */}
      {error && touched && <HandleError error={error} />}
    </div>
  );
};

export default TextInput;
