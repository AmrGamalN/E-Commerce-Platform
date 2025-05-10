import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import Button from "../Button";
import { cn } from "@/context/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Command, CommandEmpty, CommandInput, CommandList, CommandItem, CommandGroup } from "./command";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { selectStyles } from "./classNames";
import { ImSpinner8 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";
import { SelectProps } from "@/types/selectComp";
import { HandleError } from "@/utils/HandleError";
export function Select({
  id,
  options,
  loadingStatus,
  loadingError,
  title,
  value: propValue,
  placeholder = "Select an option",
  className,
  selectedChain = [],
  mandatory,
  onSelect,
  onBlur,
  touched,
  error,
  disabled = false,
  onBack,
  showBackButton = false,
  isMultiple = false,
  selectValueType = "id",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [width, setWidth] = useState<number | undefined>();

  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : "";

  const handleSelect = (currentValue: string) => {
    const option = options.find((opt) => opt._id === currentValue);
    if (!option) return;

    let selectedValue: string;
    if (selectValueType === "value") {
      selectedValue = option.value;
    } else {
      selectedValue = option._id;
    }

    let newValue;
    if (isMultiple) {
      const currentArray = Array.isArray(value) ? value : [];
      if (currentArray.includes(selectedValue)) {
        newValue = currentArray.filter((val) => val !== selectedValue);
      } else {
        newValue = [...currentArray, selectedValue];
      }
    } else {
      newValue = selectedValue === value ? "" : selectedValue;
    }

    onSelect(newValue);

    if (option.hasChildren) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  const getDisplayValue = () => {
    if (selectedChain.length > 0) {
      return selectedChain.join(" → ");
    }

    if (!value || (Array.isArray(value) && value.length === 0)) {
      return placeholder;
    }

    if (isMultiple && Array.isArray(value)) {
      return (
        options
          .filter((option) => {
            const compareVal = selectValueType === "value" ? option.value : option._id;
            return value.includes(compareVal);
          })
          .map((option) => option.label)
          .join(" - ") || placeholder
      );
    }

    const selectedOption = options.find((option) => {
      const compareVal = selectValueType === "value" ? option.value : option._id;
      return compareVal === value;
    });

    return selectedOption ? selectedOption.label : placeholder;
  };

  return (
    <div className={cn("w-full", className)}>
      <label htmlFor={id} className={selectStyles.labelStyle}>
        {title}
        {mandatory && <span className="text-red-500 text-md">*</span>}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button ref={triggerRef} aria-expanded={open} className={selectStyles.selectButton} disabled={disabled}>
            {getDisplayValue()}
            <IoIosArrowDown className={cn("opacity-50", open && "transform rotate-180")} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={selectStyles.PopoverContent}
          style={{ width: width ? `${width}px` : "auto" }}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Command>
            <CommandInput placeholder={`Search ${title.toLowerCase()}...`} onBlur={onBlur} />
            <CommandList>
              {showBackButton && (
                <CommandItem key="back" value="back" onSelect={onBack} className={selectStyles.backBtnStyle}>
                  <IoArrowBack size={20} />
                  <span className="mx-auto font-bold text-center text-sm capitalize text-gray-60">Back</span>
                </CommandItem>
              )}
              <CommandEmpty>No {title.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {loadingError ? (
                  <div key="error" className="py-4 text-center text-red-500">
                    Failed to load options.
                  </div>
                ) : loadingStatus ? (
                  <div key="loading" className="flex items-center justify-center py-4">
                    <ImSpinner8 className="animate-spin text-gray-500 text-2xl" />
                  </div>
                ) : options?.length > 0 ? (
                  options.map((option) => (
                    <CommandItem
                      key={option._id}
                      value={option._id}
                      onSelect={(val) => handleSelect(val)}
                      className={selectStyles.selectItemStyle}
                    >
                      <div className="flex items-center gap-2">
                        {option.color && (
                          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: option.color }} />
                        )}
                        {option.label}
                      </div>
                      {option.hasChildren && <IoIosArrowForward size={30} className="absolute right-0 text-gray-70" />}
                      <Check
                        className={cn(
                          "ml-auto",
                          isMultiple && Array.isArray(value)
                            ? value.includes(selectValueType === "value" ? option.value : option._id)
                              ? "opacity-100"
                              : "opacity-0"
                            : value === (selectValueType === "value" ? option.value : option._id)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))
                ) : (
                  ""
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {touched && error && <HandleError error={error} />}
    </div>
  );
}
