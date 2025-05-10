import clx from "classnames";

export const FooterStyles = {
  footerLogoDescription: clx("flex flex-row flex-wrap md:items-start md:justify-between gap-4  "),
  footerContent: clx(
    "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 xl:gap-10 gap-8 mt-10",
  ),
  contactDetailsli: clx("text-white flex flex-row gap-2 items-center "),
  footerBottomContainer: clx(
    "mt-8 text-center border-t border-gray-800 pt-4 flex lg:flex-row flex-col-reverse gap-4 lg:items-center justify-between",
  ),
  FooterPayments: clx("relative w-14 h-8 p-2 rounded-md bg-gray-10 hover:bg-gray-100 transition-colors duration-200"),
  footerForm: clx("flex flex-row items-center gap-4 border-b border-solid border-gray-600 bg-gray-100 shadow-md p-2"),
  footerFormInput: clx(
    "flex-grow rounded-lg bg-transparent border-none outline-none text-gray-40 placeholder-gray-40 placeholder:text-xs focus:bg-transparent text-sm p-2 transition",
  ),
  footerFormButton: clx(
    "bg-gray-60 px-6 py-2 text-xs rounded-full text-white flex items-center justify-center gap-2 hover:bg-gray-70 transition group",
  ),
  footerContainer: clx("bg-black text-white p-7"),

  columnHeading: clx("font-semiCond font-bold text-xs uppercase tracking-widest mb-5", "sm:text-sm"),
};
