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

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
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

  static async signup(payload: SignupPayload): Promise<SignupResponse> {
    const response = await api.post("/auth/register", payload);
    return response.data;
  }


  static async logout() {
    // clear cookies
    document.cookie = "accessToken=; path=/; max-age=0";
    document.cookie = "refreshToken=; path=/; max-age=0";
    document.cookie = "userRole=; path=/; max-age=0";
    document.cookie = "username=; path=/; max-age=0";
    window.location.href = "/login";
  }


}

export default AuthService;