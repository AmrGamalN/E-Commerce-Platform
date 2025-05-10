// classNames.ts

import clx from "classnames";

export const navbarStyles = {
  navbarContainer: clx("relative z-50 w-full bg-black text-white"),
  navbarList: clx("flex justify-center px-2 h-full items-center"),
  navbarItem: clx("relative h-full"),
  navbarButton: clx("font-semibold px-2 h-full flex items-center"),
  hoveredNavbarButton: clx("font-bold bg-white text-black"),

  dropdownWrapper: clx(
    "absolute left-0 top-full w-full z-40 pointer-events-none transition-all duration-300 ease-in-out",
  ),
  dropdownGrid: clx(
    "grid grid-cols-5 gap-4 max-h-[calc(100vh-3rem)] overflow-y-auto bg-white text-black border-t shadow-md pointer-events-auto rounded-md animate-fade-down",
  ),
  dropdownCategory: clx("space-y-4"),
  dropdownItem: clx("text-sm text-gray-70 hover:text-black"),

  heading: clx("text-md font-bold mb-3"),
  subHeading: clx("text-sm font-semibold mb-1"),
};
