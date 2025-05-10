import clx from "classnames";
export const ProductSliderStyles = {
  container: clx("relative w-full    mx-auto  rounded-lg"),
  carsualBtn: clx("text-black  hover:bg-black  hover:!text-white !rounded-full  transition-all duration-300"),
  bigImg: clx(
    "relative w-full h-full  flex items-start px-4 rounded-xl  justify-center border overflow-hidden  ",
  ),
  imgBlock: clx(
    "sm:w-20 sm:h-20 md:w-10 md:h-10 lg:w-20 lg:h-20 w-10 h-10 bg-green-10 p-4  relative cursor-pointer rounded-lg overflow-hidden ",
  ),
};
