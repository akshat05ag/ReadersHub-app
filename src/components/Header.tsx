import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { MenuIcon, X, BookOpen, LogOut, User, PlusCircle } from "lucide-react";
import { useState } from "react";
import { UserRole } from "@/types";
const Header = () => {
  const {
    currentUser,
    logout,
    isAuthenticated
  } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };
  return <header className="bg-white shadow-sm">
      <div className="container px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight">ReadersHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link to="/browse" className="text-foreground/80 hover:text-primary transition">
            Browse Books
          </Link>

          {isAuthenticated ? <>
              {currentUser?.role === "owner" && <Link to="/add-book" className="text-foreground/80 hover:text-primary transition">
                  Add Book
                </Link>}
              <Link to="/profile" className="text-foreground/80 hover:text-primary transition">
                My Profile
              </Link>
              <Button variant="ghost" className="flex items-center gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </> : <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="default">Sign Up</Button>
              </Link>
            </>}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden border-t py-4 px-4 bg-white shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link to="/browse" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md" onClick={() => setIsMenuOpen(false)}>
              <BookOpen className="h-5 w-5" />
              <span>Browse Books</span>
            </Link>

            {isAuthenticated ? <>
                {currentUser?.role === "owner" && <Link to="/add-book" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md" onClick={() => setIsMenuOpen(false)}>
                    <PlusCircle className="h-5 w-5" />
                    <span>Add Book</span>
                  </Link>}
                <Link to="/profile" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md" onClick={() => setIsMenuOpen(false)}>
                  <User className="h-5 w-5" />
                  <span>My Profile</span>
                </Link>
                <button className="flex items-center gap-2 p-2 w-full text-left hover:bg-accent rounded-md text-destructive" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </> : <div className="grid grid-cols-2 gap-2">
                <Link to="/login" className="py-2" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="py-2" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>}
          </nav>
        </div>}
    </header>;
};
export default Header;