import clx from "classnames";
export const imageCardStyles = {
  cardStyle: clx("relative h-24 w-full rounded-lg overflow-hidden shadow-md", "transition  hover:scale-105 "),
  imageAction: clx(
    "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  ),
  removeBtn: clx(
    "absolute top-1 right-0 z-10 w-8 h-8 bg-gray-70/80 text-white rounded-full",
    "flex items-center justify-center hover:bg-gray-60/90 transition",
    "focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-offset-2",
  ),
  rotateBtn: clx(
    "absolute bottom-2 left-1/2 -translate-x-1/2 z-10 w-6 h-6 bg-gray-70/80 text-white rounded-full",
    "flex items-center justify-center hover:bg-gray-60/90 transition",
    "focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-offset-2",
  ),
};
