"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { clearAuthCookies, getExistingAuth, UserRole } from "@/lib/auth";
import { PiBooksLight, PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import AuthService from "@/services/authService";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [existingRole, setExistingRole] = useState<UserRole | null>(null);
  const router = useRouter();

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    const { accessToken, userRole } = getExistingAuth();
    if (accessToken && userRole) {
      setExistingRole(userRole);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const response = await AuthService.login({ username, password });
      const { accessToken, refreshToken, user } = response;

      // store tokens and role in cookies
      const maxAge = 60 * 60 * 24; // 1 day
      document.cookie = `accessToken=${accessToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
      document.cookie = `userRole=${user.role}; path=/; max-age=${maxAge}; SameSite=Lax`;

      // Show success toast
      setToast({ message: `Welcome back, ${user.username || username}!`, type: "success" });

      // Small delay to show toast before redirect
      setTimeout(() => {
        // redirect based on role
        if (user.role === "librarian") {
          router.push("/dashboard/librarian");
        } else {
          router.push("/dashboard/student");
        }
      }, 1000);
      
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const responseMessage = err.response?.data?.message;
        if (err.response?.status === 429) {
          setToast({ message: "Too many attempts. Try again later.", type: "error" });
        } else if (err.response?.status === 400) {
          setToast({ message: "Invalid username or password", type: "error" });
        } else if (err.response?.status === 401) {
          setToast({ message: "Unauthorized. Please check your credentials.", type: "error" });
        } else if (err.response?.status === 500) {
          setToast({ message: "Server error. Please try again later.", type: "error" });
        } else if (typeof responseMessage === "string" && responseMessage.length > 0) {
          setToast({ message: responseMessage, type: "error" });
        } else {
          setToast({ message: err.message || "An error occurred during login", type: "error" });
        }
      } else if (err instanceof Error) {
        setToast({ message: err.message || "Invalid username or password", type: "error" });
      } else {
        setToast({ message: "Invalid username or password", type: "error" });
      }
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <main className="flex min-h-screen relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className={`px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 backdrop-blur-md ${
            toast.type === "success" 
              ? "bg-green-500 text-white" 
              : "bg-red-500 text-white"
          }`}>
            <span className="text-sm">
              {toast.type === "success" ? "✓" : "⚠️"}
            </span>
            <span className="text-sm font-medium">{toast.message}</span>
            <button 
              onClick={() => setToast(null)}
              className="ml-2 text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Left Side */}
      <section className="hidden lg:flex lg:w-7/12 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc-rElGDt5GFWqXr3DrJ2d2tK5WgxD1K_sknxISb02XHFXLVa07RTlirfPeAC6IFJsg3mjscxYyB115x7wFmHT-jUohwhWRcdS4qRk88mX2bB__Haz8_ilfrMucmhBtbo5nLt7M9oJuIBp91MGDnuNUzDawDL9MgthDCC-ULRMVl9_ytk2c0mjy6GRtCSttU8ESG9-jZtqbKNctEYq4OzayQZX9r9J7u0j931Lf9PkiwC9_IrydKnUThTQeIqONwTdBGeX70NwH68"
            alt="Library"
          />
          <div className="absolute inset-0 bg-[#041534]/40"></div>
        </div>
        <div className="relative z-10 max-w-2xl text-white">
          <span className="inline-block px-4 py-1 mb-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-semibold">
            Welcome to Bookshelf
          </span>
          <h1 className="text-5xl font-bold mb-8 leading-tight">
            &quot;The only thing that you absolutely have to know, is the location of the library.&quot;
          </h1>
          <p className="text-2xl font-semibold opacity-90 italic">
            — Albert Einstein
          </p>
          <div className="mt-12 flex gap-4">
            <div className="h-1 w-12 bg-amber-400 rounded-full"></div>
            <div className="h-1 w-4 bg-white/40 rounded-full"></div>
            <div className="h-1 w-4 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Right Side */}
      <section className="w-full lg:w-5/12 bg-linear-to-br from-amber-50 to-slate-100 flex items-center justify-center p-4 sm:p-6 md:p-12 min-h-screen">
        <div className="w-full max-w-120 bg-white/70 backdrop-blur-xl border border-white/30 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-4xl shadow-xl">

          {/* Header */}
          <div className="flex flex-col items-center mb-8 sm:mb-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 bg-[#041534] rounded-2xl flex items-center justify-center">
              <PiBooksLight className="text-amber-400 text-2xl sm:text-3xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#041534]">Workspace Login</h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base text-center">
              Access your digital knowledge hub
            </p>
          </div>

          {/* Existing Session Notice */}
          {existingRole && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm text-center">
              You are already signed in as <strong>{existingRole}</strong>. 
              <button
                type="button"
                onClick={() => router.push(`/dashboard/${existingRole}`)}
                className="underline font-semibold ml-1"
              >
                Continue to your dashboard
              </button>
              <button
                type="button"
                onClick={() => {
                  clearAuthCookies();
                  setExistingRole(null);
                  setToast({ message: "Logged out successfully", type: "success" });
                }}
                className="underline font-semibold ml-2"
              >
                Switch account
              </button>
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#041534] ml-1" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✉️</span>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="winfredo"
                  className="w-full pl-11 pr-4 py-3 sm:py-4 rounded-xl border border-gray-200 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm sm:text-base outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-sm font-semibold text-[#041534]" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-xs sm:text-sm font-semibold text-amber-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 sm:py-4 rounded-xl border border-gray-200 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm sm:text-base outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors text-xl"
                >
                  {showPassword ? <PiEyeSlashThin /> : <PiEyeThin />}
                </button>
              </div>
            </div>

            {/* Stay Signed In */}
            <div className="flex items-center px-1">
              <input
                id="staySignedIn"
                type="checkbox"
                className="w-4 h-4 accent-amber-500"
              />
              <label htmlFor="staySignedIn" className="ml-3 text-sm sm:text-base text-gray-500 cursor-pointer">
                Stay signed in
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-4 rounded-full bg-[#041534] text-white font-semibold text-base sm:text-lg shadow-lg hover:bg-[#1b2a4a] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login to Workspace →"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm sm:text-base text-gray-500">
              Don&apos;t have workspace access?{" "}
              <a href="#" className="text-amber-600 font-semibold hover:underline ml-1">
                Contact Administrator
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}