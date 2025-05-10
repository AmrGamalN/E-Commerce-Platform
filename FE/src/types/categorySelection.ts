import { FormikProps } from "formik";

export type Option = {
  _id: string;
  value: string;
  label: string;
  color?: string | undefined;
  hasChildren?: boolean | undefined;
};

// Define select field type to narrow `name` to valid FormValues keys
export type SelectField = {
  _id: string;
  name: string; // Restrict to FormValues keys
  title: string;
  multiple?: boolean;
  options: Option[];
};
export type CategorySelectionsProps<T> = {
  formik: FormikProps<T>;
  addingStatus: "idle" | "success" | "error";
};
// Define Mock data object
export type CategoryNode = {
  _id: string;
  name: string;
  brands?: { _id: string; name: string }[];
  subcategories?: CategoryNode[];
  types?: { _id: string; name: string }[];
};
export type FormValues = {
  category: string;
  subcategory?: string;
  nesetdSubCategory?: string;
  type?: string;
  brand?: string;

};
