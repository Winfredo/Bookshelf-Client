"use client";
import Link from "next/link";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiBook,
  FiZap,
  FiCheck,
  FiLock,
  FiArrowRight,
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { howItWorksSteps, testimonials } from "@/constants/constants";

export default function LandingPage() {
  return (
    <div className="text-[#1a1c1c] overflow-x-hidden bg-[#FDFCFB]">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm flex justify-between items-center px-6 md:px-16 h-20">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#041534]">Bookshelf</span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a
            className="text-sm font-bold text-[#835500] border-b-2 border-[#835500]"
            href="#"
          >
            Catalog
          </a>
          <a
            className="text-sm font-semibold text-gray-500 hover:text-[#041534] transition-colors"
            href="#"
          >
            My Books
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-gray-400 w-48 outline-none"
              placeholder="Search wisdom..."
              type="text"
            />
          </div>
          <button className="text-gray-500 hover:text-[#041534] text-xl">
            <FiBell />
          </button>
          <button className="text-gray-500 hover:text-[#041534] text-xl">
            <FiUser />
          </button>
          <Link
            href="/login"
            className="hidden md:block px-6 py-2 rounded-full border border-[#041534] text-[#041534] text-sm font-semibold hover:bg-[#041534]/5 transition-all"
          >
            Sign In
          </Link>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center px-6 md:px-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl mx-auto items-center gap-12">
            <div className="z-10">
              <h1 className="text-5xl md:text-6xl font-bold text-[#041534] mb-6 leading-tight">
                Unlock the World's
                <span className="text-[#835500] italic"> Wisdom</span>
              </h1>
              <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed">
                The modern library management system that bridges the gap
                between traditional research and futuristic digital curation.
                Experience knowledge without boundaries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/login"
                  className="px-10 py-4 rounded-full text-white font-semibold flex items-center justify-center gap-2 bg-linear-to-r from-[#041534] to-[#835500] hover:to-[#feae2c] transition-all"
                >
                  <span>Get Started</span>
                  <FiArrowRight />
                </Link>
                <button className="px-10 py-4 rounded-full border-2 border-[#041534] text-[#041534] font-semibold hover:bg-[#041534]/5 transition-all flex items-center justify-center gap-2">
                  <FiBook className="text-xl" />
                  <span>View Catalog</span>
                </button>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl max-w-md">
                <FiZap className="text-[#835500] text-4xl" />
                <div>
                  <p className="text-sm font-semibold text-[#041534]">
                    Instant Reservation System
                  </p>
                  <p className="text-xs text-gray-500">
                    Book study rooms or titles in under 15 seconds.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative min-h-125">
              <div className="absolute inset-0 bg-amber-100/30 rounded-[4rem] rotate-3 blur-3xl"></div>
              <img
                alt="Futuristic Library"
                className="w-full h-full object-cover rounded-[3rem] shadow-2xl relative z-0 border-8 border-white/50"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo0PXCBB--yGDihyOSxvIseVhzOeIuZX8xrAVMNatByiDLR47OfW3IER9FLNB6RFiZXGtH0GbDd9hNlTFkHhnCIbXTBlF0mtdDIL1nc53J9QDwnvtXmqIewimtgAxSIh9zL8cqDokLWvtgGrBKUJG_nYtuG7nXmJFmRKtDR0Bzc3HgLVVjCjw95cT-MHQ7fFspERpUcrMOwNNhksUQUHO93H_aC0lKz3DgcZYM8KEULhinF6TBv0ca6pN7IZC7Hfktv5C-SYTH71w"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-[#f9f9f9] px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-[#835500] uppercase tracking-widest">
                Innovation for All
              </span>
              <h2 className="text-3xl font-bold text-[#041534] mt-4">
                Powerful Tools for Every User
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Students */}
              <div className="md:col-span-7 bg-white/70 backdrop-blur-xl border-l-4 border-l-[#835500] border border-white/30 p-10 rounded-[2.5rem] flex flex-col justify-between hover:shadow-xl transition-all">
                <div>
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                    <FaGraduationCap className="text-3xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#041534] mb-4">
                    Empowering Students
                  </h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">
                    Navigate through millions of resources with our AI-powered
                    semantic search. Borrow physical books or digital papers
                    with a single tap, and manage your academic bibliography
                    seamlessly.
                  </p>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm font-semibold text-[#041534]">
                    <FiCheck className="text-[#835500]" /> One-Click Borrowing
                  </li>
                  <li className="flex items-center gap-3 text-sm font-semibold text-[#041534]">
                    <FiCheck className="text-[#835500]" /> Real-time
                    Availability Alerts
                  </li>
                </ul>
              </div>

              {/* Stats */}
              <div className="md:col-span-5 bg-[#041534] p-10 rounded-[2.5rem] text-white flex flex-col justify-center overflow-hidden relative">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#835500]/20 rounded-full blur-3xl"></div>
                <p className="text-6xl font-bold text-[#feae2c] mb-2">98%</p>
                <p className="text-2xl font-semibold mb-4">User Satisfaction</p>
                <p className="text-[#8392b7]">
                  Voted #1 library management software for higher education and
                  public institutions.
                </p>
              </div>

              {/* Librarian */}
              <div className="md:col-span-5 bg-white/70 backdrop-blur-xl border-r-4 border-r-[#041534] border border-white/30 p-10 rounded-[2.5rem] flex flex-col justify-between hover:shadow-xl transition-all">
                <div>
                  <div className="w-16 h-16 bg-[#041534]/10 rounded-2xl flex items-center justify-center mb-6">
                    <FiLock className="text-3xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#041534] mb-4">
                    Librarian Control
                  </h3>
                  <p className="text-gray-500 mb-8">
                    Complete oversight of inventory lifecycle. Track
                    circulation, handle repairs, and automate procurement based
                    on demand trends.
                  </p>
                </div>
                <button className="text-sm font-semibold text-[#041534] flex items-center gap-2 hover:gap-4 transition-all">
                  Explore Librarian Portal <FiArrowRight />
                </button>
              </div>

              {/* Data Insights */}
              <div className="md:col-span-7 bg-white/70 backdrop-blur-xl border border-amber-200/50 p-10 rounded-[2.5rem]">
                <div className="flex flex-col h-full justify-between gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#041534] mb-2">
                      Data-Driven Insights
                    </h3>
                    <p className="text-gray-500">
                      Understand reading patterns and optimize your collection
                      with powerful analytics dashboards.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="w-full h-2 bg-[#041534]/10 rounded-full overflow-hidden">
                      <div className="bg-[#835500] h-full w-[75%] rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-semibold text-[#041534]">
                          12k+
                        </p>
                        <p className="text-xs text-gray-500">Active Members</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-semibold text-[#041534]">
                          85k
                        </p>
                        <p className="text-xs text-gray-500">Titles Tracked</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-semibold text-[#041534]">
                          24h
                        </p>
                        <p className="text-xs text-gray-500">System Uptime</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 md:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold text-[#041534]">
                How Knowledge Flows
              </h2>
              <p className="text-gray-500 mt-4">
                Three simple steps to mastery.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gray-200 z-0"></div>
              {howItWorksSteps.map((step) => (
                <div key={step.num} className="text-center relative z-10 group">
                  <div className="w-20 h-20 bg-white shadow-xl rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-gray-100 group-hover:border-[#835500] transition-all">
                    <span className="text-xl font-semibold text-[#835500]">
                      {step.num}
                    </span>
                  </div>
                  <h4 className="text-2xl font-semibold text-[#041534] mb-4">
                    {step.title}
                  </h4>
                  <p className="text-gray-500 px-6">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-[#f9f9f9] px-6 md:px-16 relative overflow-hidden">
          <div className="absolute -left-20 top-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl"></div>
          <div className="absolute -right-20 bottom-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-[#835500] uppercase tracking-wider mb-2 inline-block">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#041534] mt-2">
                Voices from the Community
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                Join thousands of satisfied users who have transformed their
                library experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t) => (

                <div
                  key={t.name}
                  className="group relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/90"
                >
                  {/* Subtle gradient accent */}
                  <div className="absolute inset-0 bg-linear-to-br from-[#041534]/0 via-[#835500]/0 to-[#835500]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Icon badge */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-linear-to-br from-[#041534] to-[#835500] rounded-full flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    {t.icon}
                  </div>

                  <div className="relative z-10">
                    {/* Quote icon */}
                    <div className="mb-6">
                      <svg
                        className="w-10 h-10 text-[#835500]/20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Quote text */}
                    <p className="text-gray-600 leading-relaxed mb-6 min-h-25">
                      {t.quote}
                    </p>

                    {/* Rating stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(t.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-[#835500] fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>

                    {/* Author info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <img
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-[#835500] ring-offset-2"
                        src={t.img}
                      />
                      <div>
                        <p className="font-semibold text-[#041534]">{t.name}</p>
                        <p className="text-xs text-gray-400">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Optional: View more button */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 rounded-full border-2 border-[#041534] text-[#041534] font-semibold hover:bg-[#041534] hover:text-white transition-all duration-300">
                Read More Stories
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
