import React from "react";
import TextInput from "../UI/TextInput";

import Button from "../UI/Button";
import { Checkbox } from "../UI/CheckBox";
import { Select } from "../UI/Select";
import { useFormik } from "formik";
import * as Yup from "yup";

type UserAddressProps = {
  onCancel: () => void;
};
const categories = [
  { _id: "1", value: "electronics", label: "electronics" },
  { _id: "2", value: "clothes", label: "clothes" },
  { _id: "3", value: "shoes", label: "shoes" },
];

const UserAddress = ({ onCancel }: UserAddressProps) => {
  const validationSchema = Yup.object({
    Governorate: Yup.string().required("You must select Governorate to complete "),
    city: Yup.string().required("You must select city"),
    street: Yup.string().required("required , try to enter a detailed info here "),
  });
  const formik = useFormik({
    initialValues: {
      Governorate: "",
      city: "",
      street: "",
      isDefault: false,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });
  return (
    <div className="border border-solid rounded-lg p-4 mt-2">
      <h1 className="text-[16px] font-semibold mb-2 underline text-gray-700 tracking-normal ">Add new address</h1>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-2">
        <Select
          options={categories}
          title="Governorate"
          id="Governorate"
          name="Governorate"
          mandatory={true}
          onSelect={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.Governorate}
        />
        <Select
          options={categories}
          title="City"
          id="City"
          name="City"
          mandatory={true}
          onSelect={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.city}
        />
      </div>
      <TextInput
        label="Street"
        id="street"
        name="street"
        type="text"
        placeholder="e.g. ramses street"
        value={formik.values.street}
        error={formik.errors.street}
        touched={formik.touched.street}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        aria-invalid={formik.errors.street && formik.touched.street ? "true" : "false"}
      />
      <div className="flex flex-col md:flex-row  items-center justify-between mt-2 gap-4">
        <Checkbox label="set as Default Address" onCheckedChange={() => {}} />
        <div className="flex flex-col-reverse md:flex-row items-center gap-2">
          <Button type="reset" variant="btn-cancel" ariaLabel="cancel add new address button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="btn-primary" ariaLabel="save new address Button">
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserAddress;
