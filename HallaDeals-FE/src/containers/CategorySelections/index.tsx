import React, { useCallback, useEffect } from "react";
import { Select } from "../../components/UI/Select";
import { getCategoryOptions, getBrandOptions } from "@/utils/CategorySelection";
import { CategorySelectionsProps, FormValues, Option, SelectField } from "@/types/categorySelection";
import { PiSpinnerGap } from "react-icons/pi";
import { MockData } from "@/services/MockData/categories";
import { sizeOptions } from "@/utils/HelpersData/sizeOptions";
import { conditionsOptions } from "@/utils/HelpersData/itemConditions";
import { colorsOptions } from "@/utils/HelpersData/colorsPallete";

const BASE_SELECT_FIELDS: Omit<SelectField, "options">[] = [
  { _id: "0", name: "brand", title: "Brand" },
  { _id: "1", name: "size", title: "Size" },
  { _id: "2", name: "condition", title: "Condition" },
  { _id: "3", name: "color", title: "Colors", multiple: true },
];
const DEFAULT_OPTIONS = {
  size: sizeOptions,
  condition: conditionsOptions,
  color: colorsOptions,
};

const CategorySelections = <T extends FormValues>({ formik, addingStatus }: CategorySelectionsProps<T>) => {
  const defaultCategoriesData: Option[] = React.useMemo(
    () =>
      MockData?.map((item) => ({
        _id: item._id,
        value: item._id,
        label: item.name,
        hasChildren: getCategoryOptions(MockData, item._id).length > 0,
      })),
    [],
  );

  const [options, setOptions] = React.useState(defaultCategoriesData);
  const [path, setPath] = React.useState<string[]>([]);
  const [showAdditionalFields, setShowAdditionalFields] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [brandOptions, setBrandOptions] = React.useState<Option[]>([]);

  const handleSelection = (id: string | string[] | null) => {
    if (!id || Array.isArray(id)) return;
    const subOptions = getCategoryOptions(MockData, id);
    const selectedLabel = options.find((opt) => opt._id === id)?.label || id;

    const isTopLevel = defaultCategoriesData.some((opt) => opt._id === id);
    let newPath;
    if (isTopLevel && path.length > 0) {
      newPath = [selectedLabel];
    } else {
      newPath = [...path, selectedLabel];
    }
    setPath(newPath);

    if (subOptions.length === 0) {
      const { brands } = getBrandOptions(newPath);
      setBrandOptions(brands);
      setShowAdditionalFields(true);
      setOptions(defaultCategoriesData);
    } else {
      setOptions(
        subOptions.map((opt) => ({
          ...opt,
          hasChildren: getCategoryOptions(MockData, opt._id).length > 0,
        })),
      );
      setShowAdditionalFields(false);
    }

    if (newPath.length === 2) {
      formik.setFieldValue("category", newPath[0]);
      formik.setFieldValue("subcategory", newPath[1]);
    } else if (newPath.length === 3) {
      formik.setFieldValue("category", newPath[0]);
      formik.setFieldValue("subcategory", newPath[1]);
      formik.setFieldValue("type", newPath[2]);
    }
  };

  // when clicking on the Back Button
  const handleBack = () => {
    if (path.length === 0) return;
    const newPath = path.slice(0, -1);
    setPath(newPath);
    if (newPath.length === 0) {
      setOptions(defaultCategoriesData);
      setShowAdditionalFields(false);
      formik.setFieldValue("category", "");
    }
  };

  const handleFieldChange = (fieldName: string) => (id: string | string[] | null) => {
    if (id) {
      formik.setFieldValue(fieldName, id);
    }
  };
  const additionalFields: SelectField[] = BASE_SELECT_FIELDS.map((field) => ({
    ...field,
    options: field.name === "brand" ? brandOptions : DEFAULT_OPTIONS[field.name as keyof typeof DEFAULT_OPTIONS] || [],
  }));
  // reset everyThing to default
  const resetToDefault = useCallback(() => {
    setPath([]); // Reset path to empty array
    setOptions(defaultCategoriesData); // Reset options to default
    setShowAdditionalFields(false); // Hide additional fields
    formik.setFieldValue("category", "");
    formik.setFieldValue("subcategory", "");
    formik.setFieldValue("type", "");
  }, [formik, defaultCategoriesData]);

  useEffect(() => {
    if (addingStatus === "success") {
      resetToDefault();
    }
  }, [addingStatus, resetToDefault]);

  useEffect(() => {
    if (showAdditionalFields) {
      setIsLoading(true);
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(loadingTimer);
    }
  }, [showAdditionalFields]);

  return (
    <div className="space-y-4">
      <Select
        id="category"
        name="category"
        title="Select Category"
        options={options}
        value={formik.values.category}
        onSelect={handleSelection}
        selectedChain={path}
        showBackButton={path.length > 0}
        onBack={handleBack}
        error={typeof formik.errors.category === "string" ? formik.errors.category : ""}
        touched={!!formik.touched?.category}
        mandatory
      />
      {showAdditionalFields && isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <PiSpinnerGap size={26} className="animate-spin h-8 w-8 text-gray-80" />
        </div>
      ) : showAdditionalFields && !isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {additionalFields.map(({ _id, name, title, options, multiple }) => (
            <Select
              key={_id}
              id={_id}
              name={name}
              title={title}
              options={options}
              value={formik.values[name as keyof FormValues] || ""}
              onSelect={handleFieldChange(name)}
              error={(formik.errors[name as keyof FormValues] as string | string[]) ?? ""}
              touched={!!formik.touched?.[name as keyof FormValues]}
              isMultiple={multiple}
              selectValueType="value"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CategorySelections;
