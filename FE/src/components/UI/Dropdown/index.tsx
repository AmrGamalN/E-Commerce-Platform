import React from "react";
import { DropdownStyles } from "./classNames";

type DropdownProps = {
  options: string[];
  selected: string | boolean;
  onSelect?: (option: string) => void;
  isOpen: boolean;
  toggle?: () => void;
};

const Dropdown = ({ options, selected, onSelect, isOpen, toggle }: DropdownProps) => {
  return (
    <div className="relative">
      {/* Toggle Button */}
      <div className="flex flex-row items-center justify-center">
        <button
          type="button"
          onClick={toggle}
          className={DropdownStyles.toggleButton}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {selected}
          <svg
            className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Dropdown Options */}
      <div
        className={`${DropdownStyles.dropdownOptions} ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-[-10px] pointer-events-none"
        }`}
      >
        <ul className="py-1">
          {options.map((option) => (
            <li
              key={option}
              className={DropdownStyles.selectedOption}
              onClick={() => {
                onSelect?.(option); // Call onSelect if it exists
                toggle?.(); // Close the dropdown after selection
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
