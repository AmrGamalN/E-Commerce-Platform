import { useState } from "react";
import { FormikHelpers } from "formik";
import { FormValues } from "@/types/sellItem";
type useRotateImagesProps = {
  initialImageCount: number;
  setFieldValue: FormikHelpers<FormValues>["setFieldValue"];
};
export const UseRotateImages = ({ initialImageCount, setFieldValue }: useRotateImagesProps) => {
  // Initialize angles array with zeros based on initialImageCount
  const [imageRotateAngles, setImageRotateAngles] = useState<number[]>(
    Array.from({ length: initialImageCount }, () => 0),
  );

  const handleRotateImages = async (index: number) => {
    setImageRotateAngles((prev) => {
      const newAngles = [...prev];
      newAngles[index] = (newAngles[index] + 90) % 360;
      return newAngles;
    });
    await setFieldValue("angles", imageRotateAngles);
  };

  return {
    imageRotateAngles,
    setImageRotateAngles,
    handleRotateImages,
  };
};
