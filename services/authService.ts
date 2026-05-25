import api from "@/lib/axios";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
    username: string;
    email: string;
    role: "student" | "librarian";
  };
}

class AuthService {
  static async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await api.post("/auth/login", payload);
    return response.data;
  }

  static async logout() {
    // clear cookies
    document.cookie = "accessToken=; path=/; max-age=0";
    document.cookie = "userRole=; path=/; max-age=0";
    window.location.href = "/login";
  }
}

export default AuthService;