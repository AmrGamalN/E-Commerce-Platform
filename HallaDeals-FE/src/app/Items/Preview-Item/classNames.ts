import clx from "classnames";
export const PerviewItemStyles = {
  bgContainer: clx("fixed inset-0 z-30 bg-black bg-opacity-80 w-full px-4 ", "flex items-center justify-center"),
  keyName: clx("font-semibold text-[14px] text-gray-80 capitalize"),
  keyValue: clx("text-sm font-medium  text-gray-60 "),
  HeadingStyle: clx("text-[#262626]  font-medium capitalize text-sm  "),
  specificationContainer: clx("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 space-y-1 p-1 !mt-6"),
  sizeBlock: clx("w-10 h-8 p-2 flex items-center justify-center rounded-md  text-sm uppercase  font-medium"),
  buttonsContainer: clx(
    "flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center justify-center md:justify-end gap-2 md:mt-6 mt-10",
  ),
};
