import React from "react";
import Paragraph from "./Paragraph";
import { NewItemStyles } from "@/app/Items/New-Item/className";
import Skeleton from "react-loading-skeleton";
import ImageCard from "../ImageCard";
import Button from "./Button";
import UplpoadFile from "@/components/UI/UploadFile";
import { MdDelete } from "react-icons/md";
import { HandleError } from "@/utils/HandleError";
import { UseRemoveSingleImage } from "@/Hooks/Images/useRemoveSingleImge";
import { IoAdd } from "react-icons/io5";
import { UseRotateImages } from "@/Hooks/Images/useRotateImage";
import { UseUploadImages } from "@/Hooks/Images/useUploadImages";
import { FormValues } from "@/types/sellItem";
import { FormikProps } from "formik";
type UploadImgsProps = {
  formik: FormikProps<FormValues>;
  imageUrls: string[];
  setImageUrls: (urls: string[] | ((prev: string[]) => string[])) => void;
};
const UploadItemImgs = ({ formik, imageUrls, setImageUrls }: UploadImgsProps) => {
  // handle rotate image by custom Hook
  const { imageRotateAngles, handleRotateImages, setImageRotateAngles } = UseRotateImages({
    initialImageCount: formik.values.itemImages.length,
    setFieldValue: formik.setFieldValue,
  });
  // hadle upload images by custom Hook
  const { loadImagesStatus, handleUploadImgs } = UseUploadImages({
    itemImages: formik.values.itemImages,
    setFieldValue: formik.setFieldValue,
    setImageRotateAngles,
  });
  // remove single Img
  const { removeSingleImg } = UseRemoveSingleImage({
    itemImages: formik.values.itemImages,
    imageUrls,
    setFieldValue: formik.setFieldValue,
    setImageUrls,
    setImageRotateAngles,
  });
  // remove all images Func
  const removeAllImages = () => {
    formik.setFieldValue("itemImages", []);
    localStorage.removeItem("itemImages");
  };
  return (
    <div className="col-span-12 md:col-span-4">
      <div className={`${NewItemStyles.uploadImagesContainer} ${formik.errors.itemImages && "border-red-500"}`}>
        <Paragraph color="darkGray" align="left" size="sm" className="font-semibold underline mb-6">
          Add Up to 6 images
        </Paragraph>
        <div className="pt-6 pb-10">
          {loadImagesStatus === "pending" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Array.from({ length: 5 })?.map((_, index) => (
                <Skeleton height={60} key={index} className="rounded-lg" />
              ))}
            </div>
          ) : imageUrls?.length > 0 && loadImagesStatus === "success" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {imageUrls &&
                imageUrls.length > 0 &&
                imageUrls.map((img, index) => (
                  <ImageCard
                    key={index}
                    imgSrc={img}
                    onDelete={() => removeSingleImg(index)}
                    onRotate={() => handleRotateImages(index)}
                    rotateDeg={imageRotateAngles[index]}
                  />
                ))}
              {imageUrls?.length < 6 && (
                <div className="flex flex-col justify-center gap-2">
                  <label className={NewItemStyles.uploadIMoreLabel}>
                    <IoAdd size={16} />
                    Upload More
                    <input type="file" accept="image/*" multiple onChange={handleUploadImgs} hidden />
                  </label>
                  <Button type="button" variant="btn-delete" onClick={removeAllImages} className="px-0 text-xs">
                    <MdDelete size={16} />
                    Remove All
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <UplpoadFile accetpType="image" onChange={handleUploadImgs} name="itemImages" onBlur={formik.handleBlur} />
          )}
        </div>

        {formik.errors.itemImages && <HandleError error={formik.errors.itemImages} />}
      </div>
    </div>
  );
};

export default UploadItemImgs;
