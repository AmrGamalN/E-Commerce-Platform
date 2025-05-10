import clx from "classnames";

export const NewItemStyles = {
  uploadImagesContainer: clx(
    "col-span-12 md:col-span-4 border border-solid rounded-md overflow-hidden px-4 pb-8 pt-2 h-fit  ",
  ),
  uploadImages: clx(
    "relative mt-10 mx-auto w-[144px] h-[144px] bg-gray-10 overflow-hidden cursor-pointer rounded-full border-2  border-dashed  border-gray-40 hover:opacity-80 transition block",
  ),
  uploadImagesContent: clx(" h-full flex flex-col items-center justify-center gap-1 cursor-pointer"),
  uploadIMoreLabel: clx(
    "flex flex-row items-center justify-center text-xs bg-gray-100 text-white text-center py-2 hover:bg-gray-90 cursor-pointer rounded-md",
  ),

  InputsContainer: clx(
    "col-span-12 md:col-span-8 border border-solid px-4 py-8 shdow-sm md:shadow-md rounded-lg  flex flex-col gap-4",
  ),
};
