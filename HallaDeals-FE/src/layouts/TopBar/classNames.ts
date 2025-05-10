import clx from "classnames";

export const TopBarStyles = {
  topBarContainer: clx(
    "hidden lg:flex items-center justify-between px-4 bg-[#3d4750] border-b border-solid border-gray-20 rounded-sm",
  ),
  languageSelectorIcon: clx(
    "flex items-center gap-2 px-3 py-2 rounded-lg text-gray-40 hover:text-gray-30 transition-colors duration-200",
  ),

  languagesDropDownUl: clx(
    "absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-40 p-1 text-sm text-gray-700 z-10",
  ),
  languagesDropDownli: clx(
    "px-4 py-2 rounded-md hover:bg-selected cursor-pointer flex items-center justify-between font-medium",
  ),
};
