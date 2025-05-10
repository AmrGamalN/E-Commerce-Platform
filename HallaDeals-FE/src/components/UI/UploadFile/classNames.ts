import clx from "classnames";

export const uploadFile = {
  uploadImages: clx(
    "relative mt-10 mx-auto w-[144px] h-[144px] bg-gray-10 overflow-hidden cursor-pointer rounded-full border-2  border-dashed  border-gray-40 hover:opacity-90 hover:bg-gray-30 transition block",
  ),
  uploadImagesContent: clx(" h-full flex flex-col items-center justify-center gap-1 cursor-pointer"),
};
