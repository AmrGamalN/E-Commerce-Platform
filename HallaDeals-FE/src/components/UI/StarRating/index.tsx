import { CiStar } from "react-icons/ci";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";

type StarRatingProps = {
  avgRating: number;
};
export const StarRating = ({ avgRating }: StarRatingProps) => {
  return (
    <div className="flex items-center justify-center ">
      {[...Array(5)].map((_, index) =>
        index < Math.floor(avgRating) ? (
          <FaStar key={index} className="text-yellow-500" size={17} />
        ) : index < avgRating ? (
          <FaStarHalfStroke key={index} className="text-yellow-500" size={17} />
        ) : (
          <CiStar key={index} className="text-gray-400" size={17} />
        ),
      )}
    </div>
  );
};
