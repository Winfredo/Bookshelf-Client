"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthService from "@/services/authService";
import {
  FiBell,
  FiUser,
  FiSearch,
  FiChevronDown,
  FiInbox,
  FiBook,
  FiMail,
  FiArrowRight,
} from "react-icons/fi";
import { catalogBooks, borrowedBooks, navItems } from "@/constants/constants";
import { clearAuthCookies } from "@/lib/auth";


export default function StudentDashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBooks = catalogBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.genre.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || book.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-[#FDFCFB] min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm flex justify-between items-center px-6 md:px-16 h-20">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-[#041534]">Bookshelf</span>
          <div className="hidden md:flex gap-6 items-center">
            <a
              href="#catalog"
              className="text-gray-500 hover:text-[#041534] transition-colors text-sm font-semibold"
            >
              Catalog
            </a>
            <a
              href="#borrowed"
              className="text-[#835500] font-bold border-b-2 border-[#835500] text-sm"
            >
              My Books
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <FiBell />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <FiUser />
          </button>
          <button onClick={() => AuthService.logout()} className="ml-2 text-sm font-bold text-[#041534] hover:bg-gray-100 px-4 py-2 rounded-lg transition-all">
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mt-20 pt-12 pb-24 px-6 md:px-16 max-w-360 mx-auto w-full">
        {/* Hero */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#041534] mb-2">
            Welcome back, Alex
          </h1>
          <p className="text-lg text-gray-500">
            Find your next favorite story or manage your current collection at{" "}
            <span className="text-[#835500] font-bold">Bookshelf</span>.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-16">
            {/* Search & Filter */}
            <section id="catalog">
              <div className="bg-white/70 backdrop-blur-xl border border-white/30 p-6 rounded-3xl shadow-sm mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative grow">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FiSearch />
                    </span>
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#041534]/20 focus:border-[#041534] transition-all outline-none text-sm"
                      placeholder="Search by title, author, or genre..."
                      type="text"
                    />
                  </div>
                  <div className="flex gap-3">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#041534]/20 transition-all outline-none text-sm font-semibold min-w-32.5"
                    >
                      <option value="all">All Status</option>
                      <option value="available">Available</option>
                      <option value="borrowed">Borrowed</option>
                    </select>
                    <button className="bg-[#041534] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-[#1b2a4a] transition-all active:scale-95 flex items-center gap-2">
                      <FiChevronDown /> Filter
                    </button>
                  </div>
                </div>
              </div>

              {/* Book Catalog */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-[#041534]">
                  Book Catalog
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredBooks.length} books
                </span>
              </div>

              {filteredBooks.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-5xl mb-4">
                    <FiInbox />
                  </p>
                  <p className="text-lg font-semibold">No books found</p>
                  <p className="text-sm mt-1">
                    Try a different search or filter
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => (
                    <div
                      key={book.id}
                      className="bg-white/70 backdrop-blur-xl border border-white/30 p-4 rounded-3xl hover:-translate-y-1 transition-all duration-300 flex flex-col group shadow-sm"
                    >
                      <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-md mb-4">
                        <img
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={book.img}
                        />
                        <div
                          className={`absolute top-3 right-3 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full ${
                            book.status === "available"
                              ? "bg-amber-400/90 text-amber-900"
                              : "bg-gray-200/90 text-gray-600"
                          }`}
                        >
                          {book.status === "available"
                            ? "Available"
                            : "Borrowed"}
                        </div>
                      </div>
                      <div className="grow">
                        <h3 className="text-sm font-semibold text-[#041534] line-clamp-1">
                          {book.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {book.author}
                        </p>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                          <span>{book.genre}</span>
                          <span>{book.year}</span>
                        </div>
                      </div>
                      {book.status === "available" ? (
                        <button className="mt-4 w-full bg-[#1b2a4a] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#041534] transition-colors active:scale-95">
                          Borrow
                        </button>
                      ) : (
                        <button
                          disabled
                          className="mt-4 w-full bg-gray-100 text-gray-400 py-2.5 rounded-xl text-sm font-semibold cursor-not-allowed"
                        >
                          Unavailable
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* My Borrowed Books */}
            <section id="borrowed">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-[#041534]">
                  My Borrowed Books
                </h2>
                <span className="text-sm text-gray-500">
                  {borrowedBooks.length} active
                </span>
              </div>

              {borrowedBooks.length === 0 ? (
                <div className="text-center py-16 bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl">
                  <p className="text-5xl mb-4">
                    <FiBook />
                  </p>
                  <p className="text-lg font-semibold text-[#041534]">
                    No borrowed books
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Browse the catalog and borrow a book
                  </p>
                </div>
              ) : (
                <div className="bg-white/70 backdrop-blur-xl border border-white/30 overflow-hidden rounded-3xl shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#041534]/5">
                          <th className="px-6 md:px-8 py-5 text-sm font-semibold text-[#041534]">
                            Book Title
                          </th>
                          <th className="px-6 md:px-8 py-5 text-sm font-semibold text-[#041534]">
                            Due Date
                          </th>
                          <th className="px-6 md:px-8 py-5 text-sm font-semibold text-[#041534]">
                            Status
                          </th>
                          <th className="px-6 md:px-8 py-5 text-sm font-semibold text-[#041534] text-right">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {borrowedBooks.map((book) => (
                          <tr
                            key={book.id}
                            className="hover:bg-white/40 transition-colors"
                          >
                            <td className="px-6 md:px-8 py-5">
                              <div className="flex items-center gap-4">
                                <div className="w-8 h-12 bg-gray-100 rounded shadow-sm overflow-hidden shrink-0">
                                  <img
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                    src={book.img}
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-[#041534]">
                                    {book.title}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {book.author}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td
                              className={`px-6 md:px-8 py-5 text-sm font-medium ${book.status === "overdue" ? "text-red-500 font-bold" : "text-gray-500"}`}
                            >
                              {book.dueDate}
                            </td>
                            <td className="px-6 md:px-8 py-5">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  book.status === "overdue"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                {book.status.charAt(0).toUpperCase() +
                                  book.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 md:px-8 py-5 text-right">
                              <button
                                className={`text-sm font-semibold hover:underline transition-all ${
                                  book.status === "overdue"
                                    ? "text-red-500"
                                    : "text-[#835500]"
                                }`}
                              >
                                Return
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/30 p-8 rounded-4xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#041534] mb-6">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {[
                  {
                    icon: <FiBook className="text-lg" />,
                    label: "Borrowing History",
                  },
                  {
                    icon: <FiBell className="text-lg" />,
                    label: "Due Date Alerts",
                  },
                  {
                    icon: <FiMail className="text-lg" />,
                    label: "Contact Librarian",
                  },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-[#041534]/5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-lg shrink-0">
                      {action.icon}
                    </div>
                    <span className="text-sm font-semibold text-[#041534] group-hover:translate-x-1 transition-transform">
                      {action.label}
                    </span>
                    <span className="ml-auto text-gray-300">
                      <FiArrowRight />
                    </span>
                  </button>
                ))}
              </div>

              {/* Summary Card */}
              <div className="mt-6 p-6 bg-[#041534] text-white rounded-2xl relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 text-white/10 text-[120px]">
                  <FiBook />
                </div>
                <p className="text-xs font-semibold text-[#8392b7] mb-1 uppercase tracking-wider">
                  Currently Borrowed
                </p>
                <p className="text-3xl font-bold text-white mb-1">
                  {borrowedBooks.length} Books
                </p>
                <p className="text-xs text-[#8392b7]">
                  {borrowedBooks.filter((b) => b.status === "overdue").length}{" "}
                  overdue
                </p>
                <div className="mt-4 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{
                      width: `${(borrowedBooks.filter((b) => b.status !== "overdue").length / borrowedBooks.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/30 p-8 rounded-4xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#041534] mb-2">
                Need Help?
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Our librarians are here to help you find what you're
                looking for.
              </p>
              <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#041534] hover:bg-[#041534]/5 transition-all">
                Chat with Us
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
