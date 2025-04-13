
import { createContext, useState, useContext, ReactNode } from "react";
import { User, UserRole } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (user: Omit<User, "id">) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Jane Austen",
      email: "jane@example.com",
      password: "password123",
      mobile: "1234567890",
      role: "owner",
    },
    {
      id: "2",
      name: "Ernest Hemingway",
      email: "ernest@example.com",
      password: "password123",
      mobile: "9876543210",
      role: "seeker",
    },
  ]);
  const { toast } = useToast();

  const login = (email: string, password: string) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    
    if (user) {
      setCurrentUser(user);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = (userData: Omit<User, "id">) => {
    const emailExists = users.some((u) => u.email === userData.email);
    
    if (emailExists) {
      toast({
        title: "Registration Failed",
        description: "Email already exists",
        variant: "destructive",
      });
      return false;
    }

    const newUser = { ...userData, id: uuidv4() };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    
    toast({
      title: "Registration Successful",
      description: "Your account has been created",
    });
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
