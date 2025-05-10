import React from "react";
import { FormatNumber } from "@/utils/FormatNumber";
import { StarRating } from "../../UI/StarRating";
import { renderWithSkeleton } from "@/components/RenderWithSkeleton";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import Image from "next/image";
import type { CardItemDetails } from "@/types/cardItem";
import { cardItemsDetailsStyles } from "./classNames";
import { cardItemStyles } from "../classNames";
const CardItemDetails = ({
  location,
  date,
  title,
  price,
  isDiscount,
  userImage,
  userName,
  numOfStars,
  discount,
}: CardItemDetails) => {
  return (
    <div className={cardItemsDetailsStyles.cardContainer}>
      {/* Location & Date */}
      <div className={cardItemsDetailsStyles.location_DateContainer}>
        {renderWithSkeleton(location, () => (
          <div className="flex items-center gap-1">
            <IoLocationSharp size={16} className="text-gray-50" />
            <p className={cardItemsDetailsStyles.location_Date}>{location}</p>
          </div>
        ))}

        <span className="w-1 h-1 rounded-full bg-gray-50"></span>

        {renderWithSkeleton(date, () => (
          <div className="flex items-center gap-1">
            <MdOutlineAccessTimeFilled size={16} className="text-gray-50" />
            <p className="text-gray-60 text-xs font-medium">{date}</p>
          </div>
        ))}
      </div>

      {/* Title */}
      {renderWithSkeleton(title, () => (
        <p className="text-md font-medium text-gray-70">{title}</p>
      ))}

      {/* Price & Discount */}
      <div className="flex flex-row items-center gap-2">
        {renderWithSkeleton(price, () => (
          <p className="text-md font-semibold text-gray-70">
            {isDiscount ? (
              <>
                {FormatNumber(price)} <span className="text-sm text-gray-50 tracking-normal">EGP</span>
                <span className="line-through text-gray-50 text-sm ml-2">{FormatNumber(discount)}</span>
              </>
            ) : (
              <>
                {price} <span className="text-xs text-gray-50 tracking-normal">EGP</span>
              </>
            )}
          </p>
        ))}
      </div>

      {/* User Details */}
      <div className="flex flex-row items-center gap-2 pb-2">
        <div className={cardItemStyles.userImg}>
          <Image
            src={userImage || "/assets/images/user/defaultUser.jpg"}
            alt="User"
            className="object-cover"
            fill
            sizes="8"
          />
        </div>
        <div className="flex flex-col items-start">
          <p className="font-semibold text-gray-70 text-sm">{userName}</p>
          <StarRating avgRating={numOfStars} />
        </div>
      </div>
    </div>
  );
};

export default CardItemDetails;
