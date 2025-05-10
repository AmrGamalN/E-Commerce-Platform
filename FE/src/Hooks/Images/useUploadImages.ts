import { useState } from "react";
import { LoadingStatus } from "@/types/sellItem";
import { handleFileChange } from "@/utils/CategorySelection";
import { FormikHelpers } from "formik";
import { FormValues } from "@/types/sellItem";
type UseUploadImagesProps = {
  itemImages: File[] | string[];
  setFieldValue: FormikHelpers<FormValues>["setFieldValue"];
  setImageRotateAngles: (angles: number[] | ((prev: number[]) => number[])) => void;
};

export const UseUploadImages = ({ itemImages, setFieldValue, setImageRotateAngles }: UseUploadImagesProps) => {
  const [loadImagesStatus, setLoadImagesStatus] = useState<LoadingStatus>("idle");
  const handleUploadImgs = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = handleFileChange(e);
      if (!files || files.length === 0) throw new Error("No images selected");

      setLoadImagesStatus("pending");

      const newImages = Array.from(files);
      const updatedItemImages = [...(itemImages || []), ...newImages];

      await setFieldValue(
        "itemImages",
        updatedItemImages.map((file) => file),
      );

      // Generate angles for every image when upload
      const newAngles = Array.from({ length: newImages.length }, () => 0);
      const updatedAngles = [...(itemImages || []).map(() => 0), ...newAngles];
      await setFieldValue("angles", updatedAngles);

      // Update local state
      setImageRotateAngles(updatedAngles);
      setLoadImagesStatus("success");
    } catch (error) {
      setLoadImagesStatus("error");
      console.error("Image upload failed:", error);
    }
  };

  return {
    loadImagesStatus,
    setLoadImagesStatus,
    handleUploadImgs,
    setImageRotateAngles,
  };
};
