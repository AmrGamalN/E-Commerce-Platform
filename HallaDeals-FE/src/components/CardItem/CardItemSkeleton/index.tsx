import React from "react";
import { cardSkeltonStyles } from "./classNames";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardImgSkeleton from "./CardImgSkeleton";

const CardItemSkeleton = () => {
  return (
    <div className={cardSkeltonStyles.cardContainer}>
      {/* Image & Text Skeleton */}
      <div className={cardSkeltonStyles.cardImgContainer}>
        {/* Placeholder Image */}
        <CardImgSkeleton size={60} className={cardSkeltonStyles.cardImg} />
      </div>

      {/* Details Skeleton */}
      <div className="flex flex-col gap-2">
        {/* address and time  */}
        <div className="flex flex-row items-center justify-start gap-2">
          <Skeleton height="1rem" width="4rem"></Skeleton>
          <Skeleton height=".5rem" width=".5rem" circle></Skeleton>
          <Skeleton height="1rem" width="4rem"></Skeleton>
        </div>
        {/* title and price  */}
        <Skeleton height="1.1rem" width="10rem"></Skeleton>
        <Skeleton height="1.1rem" width="9rem"></Skeleton>
        <Skeleton height="1.1rem" width="8rem"></Skeleton>
      </div>
      {/* User Info Skeleton */}
      <div className="flex mb-3">
        <Skeleton circle width="2rem" height="2rem" className="mr-2 rounded-full"></Skeleton>
        <div>
          <Skeleton width="10rem" className="mb-2"></Skeleton>
          <Skeleton width="5rem" className="mb-2"></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default CardItemSkeleton;
