
import { useAuth } from "@/contexts/AuthContext";
import { useBooks } from "@/contexts/BookContext";
import Layout from "@/components/Layout";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Mail, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { books } = useBooks();
  
  // Get books owned by the current user
  const userBooks = books.filter((book) => book.ownerId === currentUser?.id);
  
  if (!currentUser) {
    return null;
  }

  return (
    <Layout requireAuth>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and view your books
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-md bg-accent">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    Book {currentUser.role}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{currentUser.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{currentUser.mobile}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Books Section */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>My Books</CardTitle>
                <CardDescription>
                  {currentUser.role === "owner"
                    ? "Books you've listed for exchange or rental"
                    : "As a Book Seeker, you can browse books but not list them"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentUser.role === "owner" && (
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-muted-foreground">
                      {userBooks.length} book{userBooks.length !== 1 && "s"} listed
                    </p>
                    <Link to="/add-book">
                      <Button size="sm" className="gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>Add New Book</span>
                      </Button>
                    </Link>
                  </div>
                )}

                {currentUser.role === "owner" && userBooks.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">
                      You haven't listed any books yet
                    </p>
                    <Link to="/add-book">
                      <Button>Add Your First Book</Button>
                    </Link>
                  </div>
                ) : currentUser.role === "seeker" ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">
                      As a Book Seeker, you can browse available books from owners
                    </p>
                    <Link to="/browse">
                      <Button>Browse Books</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userBooks.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
