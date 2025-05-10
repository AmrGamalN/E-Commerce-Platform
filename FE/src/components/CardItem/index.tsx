"use client";
import { IoIosHeart } from "react-icons/io";
import { cardItem } from "@/types/cardItem";
import { cardItemStyles } from "./classNames";
import CardItemDetails from "./CardItemDetails";
import CardItemSlider from "./CardItemSlider";

const CardItem = ({
  itemImages = [],
  status,
  location,
  date,
  title,
  price,
  isDiscount,
  discount,
  userImage,
  userName,
  numOfStars = 0,
}: cardItem) => {
 
  return (
    <div className={cardItemStyles.cardContainer}>
      {/* Image Slider */}
      <CardItemSlider images={itemImages} />

      {/* Like Button & Sold Badge */}
      <div className="flex flex-row items-center justify-between  ">
        <button className={`${cardItemStyles.likeBtn} ${status === "sold" ? "cursor-not-allowed" : "cursor-pointer"}`}>
          <IoIosHeart size={18} className={cardItemStyles.HeartIcon} />
        </button>
        {status === "sold" && <div className={cardItemStyles.itemCondition}>{status}</div>}
      </div>

      {/* Item Details */}
      <CardItemDetails
        location={location}
        date={date}
        title={title}
        price={price}
        isDiscount={isDiscount}
        discount={discount}
        userImage={userImage}
        userName={userName}
        numOfStars={numOfStars}
      />
    </div>
  );
};

export default CardItem;
