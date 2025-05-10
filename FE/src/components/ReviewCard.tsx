import { Card, CardContent } from "@/components/UI/card";
import { Badge } from "@/components/Badge";

interface Review {
  id: string;
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
  productTitle?: string;
}

interface ReviewCardProps {
  review: Review;
  type: "buyer" | "seller";
}

export const ReviewCard = ({ review, type }: ReviewCardProps) => {
  return (
    <Card className="border-green-200 mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="rounded-full bg-green-20 w-10 h-10 flex items-center justify-center text-green-800 font-medium mr-3">
              {review.reviewer.substring(0, 1).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{review.reviewer}</p>
              <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <svg 
                    key={i} 
                    className={`h-4 w-4 ${i < review.rating ? "text-green-50" : "text-gray-30"}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs ml-1 text-gray-500">
                  {review.date}
                </span>
              </div>
            </div>
          </div>
          {type === "buyer" && review.productTitle && (
            <Badge variant="outline" className="border-green-30 text-green-70 bg-green-10">
              {review.productTitle}
            </Badge>
          )}
        </div>
        <p className="mt-3 text-gray-600 text-sm">{review.comment}</p>
      </CardContent>
    </Card>
  );
};