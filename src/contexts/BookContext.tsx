
import { createContext, useState, useContext, ReactNode } from "react";
import { Book } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

interface BookContextType {
  books: Book[];
  addBook: (book: Omit<Book, "id" | "isRented">) => void;
  editBook: (id: string, book: Partial<Omit<Book, "id">>) => void;
  deleteBook: (id: string) => void;
  toggleRentStatus: (bookId: string) => void;
  filteredBooks: (query: string, category: string) => Book[];
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([
    {
      id: "1",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      location: "New York",
      contact: "jane@example.com",
      ownerId: "1",
      ownerName: "Jane Austen",
      isRented: false,
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "2",
      title: "1984",
      author: "George Orwell",
      genre: "Science Fiction",
      location: "London",
      contact: "jane@example.com",
      ownerId: "1",
      ownerName: "Jane Austen",
      isRented: true,
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "3",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      location: "San Francisco",
      contact: "jane@example.com",
      ownerId: "1",
      ownerName: "Jane Austen",
      isRented: false,
      coverImage: "https://images.unsplash.com/photo-1515826904570-5c1d89e50a6d?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "4",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      location: "Chicago",
      contact: "john@example.com",
      ownerId: "2",
      ownerName: "John Smith",
      isRented: false,
      coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "5",
      title: "The Hunger Games",
      author: "Suzanne Collins",
      genre: "Science Fiction",
      location: "Boston",
      contact: "mary@example.com",
      ownerId: "3",
      ownerName: "Mary Johnson",
      isRented: true,
      coverImage: "https://images.unsplash.com/photo-1531928351158-2f736078e0a1?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "6",
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      genre: "Fantasy",
      location: "Seattle",
      contact: "david@example.com",
      ownerId: "4",
      ownerName: "David Wilson",
      isRented: false,
      coverImage: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "7",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      location: "Portland",
      contact: "555-123-4567",
      ownerId: "4",
      ownerName: "David Wilson",
      isRented: false,
      coverImage: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "8",
      title: "Brave New World",
      author: "Aldous Huxley",
      genre: "Science Fiction",
      location: "Austin",
      contact: "sarah@example.com",
      ownerId: "5",
      ownerName: "Sarah Brown",
      isRented: true,
      coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "9",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Fiction",
      location: "Philadelphia",
      contact: "james@example.com",
      ownerId: "1",
      ownerName: "Jane Austen",
      isRented: false,
      coverImage: "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "10",
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      location: "Denver",
      contact: "david@example.com",
      ownerId: "4",
      ownerName: "David Wilson",
      isRented: false,
      coverImage: "https://images.unsplash.com/photo-1621351183012-9e3bf5096bdb?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "11",
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Fiction",
      location: "Miami",
      contact: "emily@example.com",
      ownerId: "2",
      ownerName: "John Smith",
      isRented: true,
      coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "12",
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science Fiction",
      location: "Las Vegas",
      contact: "555-789-1234",
      ownerId: "3",
      ownerName: "Mary Johnson",
      isRented: false,
      coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "13",
      title: "The Shining",
      author: "Stephen King",
      genre: "Horror",
      location: "Portland",
      contact: "robert@example.com",
      ownerId: "5",
      ownerName: "Sarah Brown",
      isRented: false,
      coverImage: "https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b9?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "14",
      title: "Little Women",
      author: "Louisa May Alcott",
      genre: "Classic",
      location: "Boston",
      contact: "jane@example.com",
      ownerId: "1",
      ownerName: "Jane Austen",
      isRented: false,
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "15",
      title: "The Road",
      author: "Cormac McCarthy",
      genre: "Post-Apocalyptic",
      location: "Phoenix",
      contact: "555-456-7890",
      ownerId: "2",
      ownerName: "John Smith",
      isRented: true,
      coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "16",
      title: "The Handmaid's Tale",
      author: "Margaret Atwood",
      genre: "Dystopian",
      location: "Toronto",
      contact: "sarah@example.com",
      ownerId: "5",
      ownerName: "Sarah Brown",
      isRented: false,
      coverImage: "https://images.unsplash.com/photo-1525358041480-f44a72c18868?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "17",
      title: "The Da Vinci Code",
      author: "Dan Brown",
      genre: "Mystery",
      location: "Rome",
      contact: "david@example.com",
      ownerId: "4",
      ownerName: "David Wilson",
      isRented: false,
      coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "18",
      title: "The Kite Runner",
      author: "Khaled Hosseini",
      genre: "Historical Fiction",
      location: "San Francisco",
      contact: "anna@example.com",
      ownerId: "3",
      ownerName: "Mary Johnson",
      isRented: true,
      coverImage: "https://images.unsplash.com/photo-1547555999-14e818e09e33?auto=format&fit=crop&q=80&w=800"
    }
  ]);
  
  const { toast } = useToast();

  const addBook = (bookData: Omit<Book, "id" | "isRented">) => {
    const newBook = { ...bookData, id: uuidv4(), isRented: false };
    setBooks([...books, newBook]);
    
    toast({
      title: "Book Added",
      description: `${bookData.title} has been added to your listings`,
    });
  };

  const editBook = (id: string, bookData: Partial<Omit<Book, "id">>) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, ...bookData } : book
      )
    );

    toast({
      title: "Book Updated",
      description: "Your book information has been updated",
    });
  };

  const deleteBook = (id: string) => {
    const bookToDelete = books.find(book => book.id === id);
    setBooks(books.filter((book) => book.id !== id));
    
    if (bookToDelete) {
      toast({
        title: "Book Deleted",
        description: `${bookToDelete.title} has been removed from your listings`,
      });
    }
  };

  const toggleRentStatus = (bookId: string) => {
    setBooks(
      books.map((book) =>
        book.id === bookId ? { ...book, isRented: !book.isRented } : book
      )
    );
    
    const book = books.find((b) => b.id === bookId);
    if (book) {
      toast({
        title: book.isRented ? "Book Available" : "Book Rented",
        description: `${book.title} is now ${book.isRented ? "available" : "marked as rented"}`,
      });
    }
  };

  const filteredBooks = (query: string, category: string) => {
    return books.filter((book) => {
      const matchesQuery =
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.location.toLowerCase().includes(query.toLowerCase());
      
      if (category === "all") return matchesQuery;
      if (category === "available") return matchesQuery && !book.isRented;
      if (category === "rented") return matchesQuery && book.isRented;
      return (
        matchesQuery && book.genre?.toLowerCase() === category.toLowerCase()
      );
    });
  };

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        editBook,
        deleteBook,
        toggleRentStatus,
        filteredBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
}
