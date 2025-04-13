
import { Book } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useBooks } from "@/contexts/BookContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, BookText, Pencil, Trash2 } from "lucide-react";
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

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const { currentUser } = useAuth();
  const { toggleRentStatus, deleteBook } = useBooks();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const isOwner = currentUser?.id === book.ownerId;
  const contactInfo = book.contact.includes("@") ? (
    <Mail className="h-4 w-4" />
  ) : (
    <Phone className="h-4 w-4" />
  );

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative h-48">
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
        </CardFooter>
      </Card>
      
      {isEditDialogOpen && (
        <EditBookDialog 
          book={book}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
        />
      )}
    </>
  );
};

export default BookCard;
