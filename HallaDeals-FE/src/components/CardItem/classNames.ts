import clx from "classnames";

export const cardItemStyles = {
  cardContainer: clx("overflow-hidden border border-gray-30 rounded-lg  bg-white relative group"),
  imagesContainer: clx("w-full  rounded-md relative flex transition-transform duration-500 ease-in-out"),
  itemImage: clx("relative flex-shrink-0 w-full aspect-[4/3] rounded-lg overflow-hidden"),
  cardNavigateButton: clx(
    "absolute top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-white",
  ),
  dotsIndicator: clx(
    "absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-gray-20 opacity-70  rounded-full p-1",
  ),
  likeBtn: clx(
    "absolute top-2 right-2 bg-white p-2 rounded-full border border-gray-300 flex items-center justify-center hover:text-red-500 ",
  ),
  HeartIcon: clx(
    "text-gray-50 hover:text-red-600 hover:bg-white hover:border-gray-10 transition-all ease-in-out duration-300",
  ),
  itemCondition: clx("absolute top-0 left-0 bg-gray-800 text-white text-xs py-1 px-3 rounded-tr-md rounded-bl-md"),
  userImg: clx("w-8 h-8 relative overflow-hidden rounded-full border border-gray-30 shadow-md"),
};
