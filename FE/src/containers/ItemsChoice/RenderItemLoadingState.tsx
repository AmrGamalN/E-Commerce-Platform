import CardItemSkeleton from "@/components/CardItem/CardItemSkeleton";
import { CarouselContent, CarouselItem } from "@/components/UI/Carousel";
import { itemChoiceStyles } from "./classNames";

export const RenderItemLoadingState = () => {
  return (
    <CarouselContent>
      {Array.from({ length: 4 }).map((_, index) => (
        <CarouselItem className={itemChoiceStyles.carouselItem} key={index}>
          <CardItemSkeleton />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
};
