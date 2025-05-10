"use client";
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/UI/Carousel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardItem from "@/components/CardItem";
import { useFetch } from "@/Hooks/apiHooks/useFetch";
import { itemChoiceStyles } from "./classNames";
import { cardItem } from "@/types/cardItem";
import { RenderErrorState } from "@/components/RenderErrorState";
import { RenderItemLoadingState } from "./RenderItemLoadingState";
import RenderEmptyData from "@/components/RenderEmptyData";

// Define TypeScript types for API response
type ApiResponse = {
  paginationInfo: object;
  message: string;
  data: cardItem[];
};
type ItemsChoice = {
  title: string;
  endPoint: string;
};
const ItemsChoice = ({ title, endPoint }: ItemsChoice) => {
  // Fetch data using react-query
  const { data, isLoading, isError } = useFetch<ApiResponse>(`item/filter?category=${endPoint}`);
  if (isError) {
    console.error("API request failed:", isError);
    return <div>Error: {isError}</div>;
  }
  return (
    <section className="container relative mt-20 py-4">
      {/* Section Heading */}
      {isLoading ? (
        <Skeleton height="1rem" width="6rem" />
      ) : (
        <h1 className={itemChoiceStyles.categoryHeading}>{title}</h1>
      )}

      <div className="mt-4">
        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          {/* Navigation Arrows */}
          <div className={itemChoiceStyles.sliderArrows}>
            {isLoading ? (
              <>
                <Skeleton height="2rem" width="2rem" circle />
                <Skeleton height="2rem" width="2rem" circle />
              </>
            ) : !isLoading && data !== undefined && data.data && data.data.length > 1 ? (
              <>
                <CarouselPrevious className={itemChoiceStyles.carouselBtn} />
                <CarouselNext className={itemChoiceStyles.carouselBtn} />
              </>
            ) : null}
          </div>

          {/* Render content based on status */}
          {isLoading && <RenderItemLoadingState />}
          {isError && <RenderErrorState />}
          {/* if data & status is success */}
          {!isLoading && !isError && data?.data?.length === 0 && <RenderEmptyData />}
          {!isLoading && !isError && data?.data && data.data.length >= 1 ? (
            <CarouselContent>
              {data?.data.map((item, idx) => (
                <CarouselItem className={itemChoiceStyles.carouselItem} key={item._id || idx}>
                  <CardItem {...item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          ) : null}
        </Carousel>
      </div>
    </section>
  );
};

export default ItemsChoice;
