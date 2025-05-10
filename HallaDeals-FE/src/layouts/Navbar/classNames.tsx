import clx from "classnames";

export const NavbarStyles = {
  navbarLogo: clx("flex flex-row items-center  justify-center gap-1 font-bold "),
  navbarForm: clx("relative w-full mt-4 lg:mt-0 lg:order-1 lg:w-auto flex items-center"),
  navbarInput: clx(
    "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-50 hover:text-blue-700 focus:outline-none",
  ),
  CategoriesDropdown: clx(
    "flex items-center bg-gray-30 text-gray-50 px-4 py-3 border-r border-gray-40 rounded-tl-full rounded-bl-full",
  ),
  CategoriesDropdownUl: clx(
    "fabsolute top-full mt-2 left-0 bg-white shadow-lg rounded-md w-40 py-2 z-10 text-gray-700 h-fit border border-solid border-gray-40",
  ),
  sellNowStyle: clx(
    "font-medium text-sm leading-[1.71429] capitalize   shadow-none text-black   outline-none border border-solid border-neutral-200 m-0 no-underline px-4 py-[6px] rounded-md   transition-all duration-300 ease-in-out bg-gray-90 hover:bg-gray-80  text-white shadow-md hover:shadow-lg",
  ),
  authLinks: clx("text-gray-600 hover:text-gray-900 transition-all"),
};
