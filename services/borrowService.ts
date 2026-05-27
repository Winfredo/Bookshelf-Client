import api from "@/lib/axios";
import { Borrow } from "@/types/type";

export interface BorrowResponse {
  success: boolean;
  count: number;
  borrows: Borrow[];
}

class BorrowService {
  static async borrowBook(bookId: string): Promise<Borrow> {
    const response = await api.post(`/borrows/${bookId}`);
    return response.data;
  }

  static async returnBook(borrowId: string): Promise<Borrow> {
    const response = await api.put(`/borrows/${borrowId}/return`);
    return response.data;
  }

  static async getMyBorrows(): Promise<BorrowResponse> {
    const response = await api.get("/borrows/my-books");
    return response.data;
  }

  static async getAllBorrows(): Promise<BorrowResponse> {
    const response = await api.get("/borrows");
    return response.data;
  }

  static async getOverdueBorrows(): Promise<BorrowResponse> {
    const response = await api.get("/borrows/overdue");
    return response.data;
  }
}

export default BorrowService;