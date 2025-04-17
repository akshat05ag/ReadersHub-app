
import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBooks } from "@/contexts/BookContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BookRatingProps {
  bookId: string;
  rating?: number;
  isOwner: boolean;
  className?: string;
}

const BookRating = ({ bookId, rating = 0, isOwner, className }: BookRatingProps) => {
  const { updateBookRating } = useBooks();

  const handleRatingChange = (newRating: number) => {
    if (!isOwner) {
      updateBookRating(bookId, newRating);
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TooltipProvider key={star}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Star
                className={cn(
                  "h-4 w-4", 
                  !isOwner && "cursor-pointer",
                  rating >= star 
                    ? "text-yellow-500 fill-yellow-500" 
                    : "text-muted-foreground"
                )}
                onClick={() => !isOwner && handleRatingChange(star)}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{isOwner ? `Rating: ${star}/5` : `Rate ${star}/5`}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      <span className="ml-2 text-xs text-muted-foreground">
        {rating ? `${rating}/5` : "No ratings"}
      </span>
    </div>
  );
};

export default BookRating;