import { FormikErrors, FormikTouched } from "formik";

export type SelectProps = {
  id: string;
  options: {
    _id: string;
    label: string;
    value: string;
    hasChildren?: boolean;
    color?: string;
  }[];
  loadingStatus?: boolean;
  loadingError?: boolean;
  name: string;
  title: string;
  value?: string | string[];
  defaultValue?: string | string[];
  placeholder?: string;
  className?: string;
  selectedChain?: string[];
  mandatory?: boolean;
  onSelect: (value: string | string[]) => void;
  touched?: boolean | FormikTouched<string> | FormikTouched<string[]> | undefined;
  error?: string | FormikErrors<string> | FormikErrors<string[]> | undefined;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled?: boolean;
  onBack?: () => void;
  showBackButton?: boolean;
  isMultiple?: boolean;
  selectValueType?: "id" | "value";
};
