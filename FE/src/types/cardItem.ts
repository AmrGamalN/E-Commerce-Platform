import { ImageItem } from "./ImageItem";

export type cardItem = {
  _id: string;
  status: string;
  itemImages: ImageItem[];
  angles: number[];
  numOfLikes: number;
  location: string;
  date: string;
  title: string;
  price: number;
  isDiscount: boolean;
  discount: number;
  userName: string;
  userImage: string;
  numOfStars: number;
  isSold?: boolean;
};
export type CardItemDetails = {
  location: string;
  date: string;
  title: string;
  price: number;
  isDiscount: boolean;
  discount: number;
  userName: string;
  userImage: string;
  numOfStars: number;
  isSold?: boolean;
};
