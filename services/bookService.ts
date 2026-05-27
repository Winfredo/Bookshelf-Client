import api from "@/lib/axios";
import { Book } from "@/types/type";

export interface BookListResponse {
  success: boolean;
  count: number;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalBooks: number;
  };
  data: Book[];
}

export interface BookResponse {
  success: boolean;
  data: Book;
}

export interface BookQueryParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface BookPayload {
  title: string;
  author: string;
  genre: string;
  year: number;
  status?: "available" | "borrowed";
  img?: string;
}

class BookService {
  static async getAllBooks(params?: BookQueryParams): Promise<BookListResponse> {
    const response = await api.get("/books", { params });
    return response.data;
  }

  static async getBookById(bookId: string): Promise<BookResponse> {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  }

  static async createBook(payload: BookPayload): Promise<BookResponse> {
    const response = await api.post("/books", payload);
    return response.data;
  }

  static async updateBook(bookId: string, payload: Partial<BookPayload>): Promise<BookResponse> {
    const response = await api.put(`/books/${bookId}`, payload);
    return response.data;
  }

  static async deleteBook(bookId: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete(`/books/${bookId}`);
    return response.data;
  }
}

export default BookService;
