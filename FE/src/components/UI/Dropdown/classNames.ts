import clx from "classnames";

export const DropdownStyles = {
  toggleButton: clx(
    "flex items-center  w-full text-md capitalize text-gray-50 bg-transparent outline-none transition",
  ),
  dropdownOptions: clx(
    "absolute top-full z-10 mt-2 w-fit right-0  origin-top-right bg-white border border-[#dbdada] rounded-[10px] shadow-lg transition ",
  ),
  selectedOption: clx(
    "px-6 py-2 text-[14px] text-[#777] hover:bg-[#f5f5f5] cursor-pointer transition-colors duration-200",
  ),
};
