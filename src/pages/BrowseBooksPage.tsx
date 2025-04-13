
import { useState } from "react";
import { useBooks } from "@/contexts/BookContext";
import BookCard from "@/components/BookCard";
import BookFilter from "@/components/BookFilter";
import Layout from "@/components/Layout";

const BrowseBooksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const { filteredBooks } = useBooks();

  const displayedBooks = filteredBooks(searchQuery, category);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Browse Books</h1>
          <p className="text-muted-foreground">
            Discover books available for exchange or rental in your community
          </p>
        </div>

        <BookFilter
          onSearch={setSearchQuery}
          onCategoryChange={setCategory}
        />

        {displayedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium">No books found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BrowseBooksPage;
