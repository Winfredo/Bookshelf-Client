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

      {/* Right Side - with elegant gradient background */}
      <section className="w-full lg:w-5/12 relative overflow-y-auto">
        {/* Warm gradient background that complements the form */}
        <div className="absolute inset-0 bg-linear-to-br from-amber-50 via-orange-50 to-white"></div>
        {/* Subtle noise texture overlay for depth */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '150px'
        }}></div>
        {/* Soft radial glow */}
        <div className="absolute inset-0 bg-linear-radial from-transparent via-amber-100/20 to-transparent"></div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 my-auto transition-all duration-300 hover:shadow-3xl">
            {/* Header */}
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mb-3 bg-linear-to-br from-[#041534] to-[#1b2a4a] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-amber-400 text-xl sm:text-2xl">📚</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-[#041534] to-[#1b2a4a] bg-clip-text text-transparent">
                Workspace Login
              </h2>
              <p className="text-gray-500 mt-1 text-xs sm:text-sm text-center">
                Access your digital knowledge hub
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-700 ml-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✉️</span>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@bookshelf.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all text-sm outline-none shadow-sm hover:shadow-md"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors hover:underline" onClick={(e) => e.preventDefault()}>
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 bg-white/90 backdrop-blur-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all text-sm outline-none shadow-sm hover:shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                  className="w-3.5 h-3.5 accent-amber-500 rounded border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
                  Stay signed in
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-linear-to-r from-[#041534] to-[#1b2a4a] text-white font-semibold text-sm shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:from-[#1b2a4a] hover:to-[#041534]"
              >
                Login to Workspace
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200/50 text-center">
              <p className="text-xs sm:text-sm text-gray-500">
                Don't have workspace access?{" "}
                <a href="#" className="text-amber-600 font-semibold hover:text-amber-700 transition-colors hover:underline ml-1" onClick={(e) => e.preventDefault()}>
                  Contact Administrator
                </a>
              </p>
            </div>

            {/* Security Bar */}
            <div className="mt-5 flex flex-col gap-1.5">
              <div className="flex justify-between items-end">
                <span className="text-xs text-gray-500">System Security Readiness</span>
                <span className="text-xs text-amber-600 font-bold">100%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-linear-to-r from-amber-400 to-amber-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}