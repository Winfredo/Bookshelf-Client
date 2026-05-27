import { ReactNode } from "react";

export type BookItem = {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  img: string;
  status?: "available" | "borrowed";
  dueDate?: string;
};

export type CirculationItem = {
  initials: string;
  name: string;
  book: string;
  borrowDate: string;
  dueDate: string;
  status: "borrowed" | "overdue";
};

export type NavItem = {
  label: string;
  icon: ReactNode;
  active: boolean;
};

export type HowItWorksStep = {
  num: string;
  title: string;
  desc: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  img: string;
  rating: number;
  icon: ReactNode;
};

export type Book = {
  _id: string;
  id?: number;
  title: string;
  author: string;
  genre: string;
  year?: number;
  publishedYear?: number;
  status: "available" | "borrowed" | string;
  img?: string;
};

export type BorrowedBook = {
    id: number;
    title: string;
    author: string;
    dueDate: string;
    status: "active" | "overdue";
    img: string;
    
}

export type Borrow = {
  borrowId: string;
  student: {
    _id: string;
    username: string;
    email: string;
  };
  book: {
    _id: string;
    title: string;
    author: string;
    genre: string;
  };
  borrowedAt: string;
  dueDate: string;
  returnedAt: string | null;
  status: "active" | "returned" | "overdue";
};