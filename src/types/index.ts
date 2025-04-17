
export type UserRole = "owner" | "seeker";

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  password?: string; // Added password field
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string;
  location: string;
  contact: string;
  ownerId: string;
  ownerName: string;
  isRented: boolean;
  coverImage?: string;
  rating?: number;
}