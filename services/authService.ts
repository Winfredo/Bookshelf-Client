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
  const { accessToken, refreshToken, user } = response.data;

  // ✅ Store the real tokens
  const maxAge = 60 * 60 * 24;
  document.cookie = `accessToken=${accessToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `userRole=${user.role}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `username=${user.username}; path=/; max-age=${maxAge}; SameSite=Lax`;

  return response.data;
}

  static async signup(payload: SignupPayload): Promise<SignupResponse> {
    const response = await api.post("/auth/register", payload);
    return response.data;
  }


 static async logout() {
  try {
    await api.post("/auth/logout"); 
  } catch (_) {}

  document.cookie = "accessToken=; path=/; max-age=0";
  document.cookie = "refreshToken=; path=/; max-age=0";
  document.cookie = "userRole=; path=/; max-age=0";
  document.cookie = "username=; path=/; max-age=0";
  localStorage.removeItem("username");
  window.location.href = "/login";
}


}

export default AuthService;