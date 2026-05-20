"use client";

import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen h-screen w-screen overflow-hidden">
      {/* Left Side - hidden on mobile */}
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
            "The only thing that you absolutely have to know, is the location of the library."
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

      {/* Right Side - full width on mobile, no overflow */}
      <section className="w-full lg:w-5/12 bg-[#fdfcfb] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/30 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl my-auto">
          {/* Header */}
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mb-3 bg-[#041534] rounded-2xl flex items-center justify-center">
              <span className="text-amber-400 text-xl sm:text-2xl">📚</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#041534]">Workspace Login</h2>
            <p className="text-gray-500 mt-1 text-xs sm:text-sm text-center">
              Access your digital knowledge hub
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-[#041534] ml-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✉️</span>
                <input
                  id="email"
                  type="email"
                  placeholder="you@bookshelf.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="block text-sm font-semibold text-[#041534]" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-amber-600 hover:underline" onClick={(e) => e.preventDefault()}>
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors text-sm"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Stay Signed In */}
            <div className="flex items-center px-1">
              <input
                id="staySignedIn"
                type="checkbox"
                className="w-3.5 h-3.5 accent-amber-500"
              />
              <label htmlFor="staySignedIn" className="ml-2 text-sm text-gray-500 cursor-pointer">
                Stay signed in
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-[#041534] text-white font-semibold text-sm shadow-lg hover:bg-[#1b2a4a] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Login to Workspace
              <span>→</span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              Don't have workspace access?{" "}
              <a href="#" className="text-amber-600 font-semibold hover:underline ml-1" onClick={(e) => e.preventDefault()}>
                Contact Administrator
              </a>
            </p>
          </div>

          {/* Security Bar */}
          <div className="mt-5 flex flex-col gap-1.5">
            <div className="flex justify-between items-end">
              <span className="text-xs text-gray-400">System Security Readiness</span>
              <span className="text-xs text-amber-600 font-bold">100%</span>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-full bg-amber-400"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}