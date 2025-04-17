
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BookText } from "lucide-react";

interface BookCoverPreviewProps {
  coverImage?: string;
  title: string;
  author: string;
}

const BookCoverPreview = ({ coverImage, title, author }: BookCoverPreviewProps) => {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer relative h-48 rounded-t-md overflow-hidden">
          {coverImage ? (
            <img 
              src={coverImage} 
              alt={`${title} cover`} 
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="book-cover-gradient w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <BookText className="h-10 w-10 text-primary/50" />
            </div>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-center">
          {coverImage ? (
            <img 
              src={coverImage} 
              alt={`${title} cover`} 
              className="max-h-[200px] object-contain rounded-md shadow-sm"
            />
          ) : (
            <div className="book-cover-gradient w-40 h-60 flex items-center justify-center rounded-md shadow-sm bg-gradient-to-br from-slate-100 to-slate-200">
              <BookText className="h-10 w-10 text-primary/50" />
            </div>
          )}
        </div>
        <div className="mt-2 text-center">
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">by {author}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default BookCoverPreview;