import { FormikHelpers } from "formik";
import { FormValues } from "@/types/sellItem";
type UseRemoveSingleImagesProps = {
  itemImages: File[] | string[];
  imageUrls: string[];
  setFieldValue: FormikHelpers<FormValues>["setFieldValue"];
  setImageUrls: (urls: string[] | ((prev: string[]) => string[])) => void;
  setImageRotateAngles: (angles: number[] | ((prev: number[]) => number[])) => void;
};
export const UseRemoveSingleImage = ({
  itemImages,
  imageUrls,
  setFieldValue,
  setImageUrls,
  setImageRotateAngles,
}: UseRemoveSingleImagesProps) => {
  const removeSingleImg = async (imgIndex: number) => {
    try {
      //    remove urls for deleted images
      const removedImageUrl = imageUrls[imgIndex];
      if (removedImageUrl) URL.revokeObjectURL(removedImageUrl);

      // remove image from itemImages
      const updatedImages = itemImages.filter((_, index) => index !== imgIndex);

      // update formik
      await setFieldValue("itemImages", updatedImages);
      // update imageUrls
      const ImgsFilesOnly = updatedImages.filter((img): img is File => img instanceof File);
      if (ImgsFilesOnly.length === 0) {
        setImageUrls([]);
        return;
      }
      const updatedUrls = ImgsFilesOnly.map((img) => URL.createObjectURL(img));
      setImageUrls(updatedUrls);

      // update imageRotateAngles
      setImageRotateAngles((prev) => prev.filter((_, index) => index !== imgIndex));
    } catch (error) {
      console.error("Failed to remove image:", error);
    }
  };

  return { removeSingleImg };
};
