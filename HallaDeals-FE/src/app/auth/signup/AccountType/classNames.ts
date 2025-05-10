import clx from "classnames";
export const accountTypeStyles = {
  container: clx("container grid grid-cols-12 md:gap-10 gap-1"),
  leftSction: clx("md:flex flex-col items-start gap-10 md:col-span-6 hidden"),
  rightSectionHeading: clx("w-full capitalize text-base md:text-xl tracking-wide font-semibold text-gray-80 mb-2 "),
  accountTypeSection: clx(
    "relative flex flex-row justify-between items-start gap-2 p-4 border border-solid cursor-pointer rounded-lg hover:bg-green-10 transition-all duration-200 ease-in-out w-full",
  ),
  leftSectionImg: clx("flex flex-row  items-center justify-start gap-1  py-4    w-full"),
  leftSectionmainHeading: clx("text-xl font-extrabold tracking-tight  text-gray-90  "),
  leftSectionHeading: clx("text-[3.5rem] font-extrabold tracking-tighter text-gray-90  mt-12 leading-none"),

  checkBoxStyle: clx(
    "w-6 h-6 mt-1 rounded-full border-2 flex items-center justify-center transition-all duration-200 ease-in-out",
  ),
};
