import clx from "classnames";

export const cardSkeltonStyles = {
  cardContainer: clx("flex flex-col gap-5 h-[350px] w-full border border-gray-20   rounded-lg p-5  "),
  cardImgContainer: clx("flex items-center gap-4 oberflow-hidden rounded-lg"),
  cardImg: clx("h-20 w-20 flex-shrink-0 text-gray-30"),
  contentWrapper: clx("flex flex-col w-full gap-3"),
  userContainer: clx("flex items-center gap-3 mt-4"),
  userImage: clx("w-12 h-12 rounded-full"),
  userDetails: clx("flex flex-col gap-2 w-full"),
};
