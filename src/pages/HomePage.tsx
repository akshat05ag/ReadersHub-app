
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, BookOpen, BookPlus, Users } from "lucide-react";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Share the joy of reading through our{" "}
            <span className="text-primary">book exchange</span> community
          </h1>
          <p className="text-lg text-muted-foreground">
            Connect with readers near you, share your favorite books, and discover
            new stories without spending a fortune.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/browse">
              <Button size="lg" className="gap-2">
                <BookOpen className="h-5 w-5" />
                <span>Browse Books</span>
              </Button>
            </Link>
            {!isAuthenticated && (
              <Link to="/register">
                <Button size="lg" variant="outline" className="gap-2">
                  <Users className="h-5 w-5" />
                  <span>Join Community</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000"
            alt="Book collection"
            className="rounded-lg shadow-lg w-full h-[400px] object-cover"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ReadersHub makes exchanging books with readers in your community
            simple and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
            <p className="text-muted-foreground">
              Sign up as a Book Owner to share your collection, or a Book Seeker
              to browse available books.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <BookPlus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">List or Browse Books</h3>
            <p className="text-muted-foreground">
              Book Owners can list their books, while everyone can browse
              available titles in their area.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <ArrowRight className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect and Share</h3>
            <p className="text-muted-foreground">
              Contact book owners directly and arrange to exchange or borrow
              books in your community.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="bg-secondary rounded-xl p-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to join our community?</h2>
            <p className="text-lg">
              Create an account today and start sharing the joy of reading with
              people near you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg">Create Account</Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
