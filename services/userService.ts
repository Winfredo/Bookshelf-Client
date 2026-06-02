import api from "@/lib/axios";

export interface User {
  _id: string;
  username: string;
  email: string;
  role: "student" | "librarian";
}

export interface UsersResponse {
  success: boolean;
  count: number;
  data: User[];
}

class UserService {
  static async getAllUsers(): Promise<UsersResponse> {
    const response = await api.get("/users");
    return response.data;
  }

  static async getUserCount(): Promise<{ success: boolean; count: number }> {
    const response = await api.get("/users/count");
    return response.data;
  }
}

export default UserService;
