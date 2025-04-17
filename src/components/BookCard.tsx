
import { Book } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useBooks } from "@/contexts/BookContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, BookText, Pencil, Trash2, Star, ExternalLink } from "lucide-react";
import { useState } from "react";
import EditBookDialog from "./EditBookDialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const { currentUser } = useAuth();
  const { toggleRentStatus, deleteBook, updateBookRating } = useBooks();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const isOwner = currentUser?.id === book.ownerId;
  const contactInfo = book.contact.includes("@") ? (
    <Mail className="h-4 w-4" />
  ) : (
    <Phone className="h-4 w-4" />
  );

  const handleQuickContact = () => {
    if (book.contact.includes("@")) {
      window.location.href = `mailto:${book.contact}?subject=Regarding your book: ${book.title}`;
    } else {
      window.location.href = `tel:${book.contact}`;
    }
    toast({
      title: "Contact Information",
      description: `Contacting ${book.ownerName} regarding "${book.title}"`,
    });
  };

  const handleRatingChange = (newRating: number) => {
    updateBookRating(book.id, newRating);
  };

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative h-48 cursor-pointer" onClick={() => setIsPreviewOpen(true)}>
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: book.coverImage 
                ? `url(${book.coverImage})` 
                : 'none' 
            }}
          >
            {!book.coverImage && (
              <div className="book-cover-gradient w-full h-full flex items-center justify-center">
                <BookText className="h-10 w-10 text-primary/50" />
              </div>
            )}
          </div>
          {book.genre && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="font-medium">
                {book.genre}
              </Badge>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <h3 className="text-white font-semibold truncate">{book.title}</h3>
            <p className="text-white/80 text-sm">{book.author}</p>
          </div>
          <div className="absolute top-2 left-2">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              <ExternalLink className="h-3 w-3 mr-1" /> Preview
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Listed by {book.ownerName}
            </span>
            <Badge variant={book.isRented ? "outline" : "default"}>
              {book.isRented ? "Rented" : "Available"}
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{book.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            {contactInfo}
            <span className="ml-1">{book.contact}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-1 h-6 w-6" 
              onClick={handleQuickContact}
              title={`Quick contact ${book.ownerName}`}
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
          
          {/* Rating System */}
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 cursor-pointer ${
                  (book.rating || 0) >= star ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                }`}
                onClick={() => !isOwner && handleRatingChange(star)}
              />
            ))}
            <span className="ml-2 text-xs text-muted-foreground">
              {book.rating ? `${book.rating}/5` : "No ratings"}
            </span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-end gap-2">
          {isOwner && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsEditDialogOpen(true)}
                title="Edit book"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    title="Delete book"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete book listing?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{book.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => deleteBook(book.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              
              <Button
                variant={book.isRented ? "outline" : "default"}
                size="sm"
                onClick={() => toggleRentStatus(book.id)}
              >
                {book.isRented ? "Mark as Available" : "Mark as Rented"}
              </Button>
            </>
          )}
          
          {!isOwner && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleQuickContact}
            >
              Contact Owner
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {isEditDialogOpen && (
        <EditBookDialog 
          book={book}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
        />
      )}

      {/* Book Cover Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{book.title} by {book.author}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-4">
            {book.coverImage ? (
              <img 
                src={book.coverImage}
                alt={`${book.title} cover`}
                className="max-h-[60vh] object-contain rounded-md shadow-md"
              />
            ) : (
              <div className="book-cover-gradient w-full h-[60vh] flex items-center justify-center rounded-md shadow-md">
                <BookText className="h-20 w-20 text-primary/50" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookCard;