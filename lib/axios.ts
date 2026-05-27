import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import { getCookieValue, clearAuthCookies } from "./auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token to every request automatically
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getCookieValue("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle responses and errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const isAuthPage = ["/login", "/signup"].includes(window.location.pathname);

    if (error.response?.status === 401 && !isAuthPage) {
      clearAuthCookies();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;