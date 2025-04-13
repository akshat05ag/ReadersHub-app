
import React from "react";
import Header from "./Header";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const Layout = ({ children, requireAuth = false }: LayoutProps) => {
  const { isAuthenticated } = useAuth();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8">
        {children}
      </main>
      <footer className="bg-secondary py-6">
        <div className="container px-4 text-center">
          <p className="text-secondary-foreground">
            &copy; {new Date().getFullYear()} ReadersHub - Connect with books and readers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
