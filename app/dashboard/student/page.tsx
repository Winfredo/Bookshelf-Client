"use client";

import { useEffect, useRef, useState } from "react";
import {
  PiBellSimpleRinging,
  PiUserCircle,
  PiMagnifyingGlass,
  PiBookOpenText,
  PiBooks,
  PiEnvelopeSimple,
  PiArrowRight,
  PiArrowLeft,
} from "react-icons/pi";
import AuthService from "@/services/authService";
import BookService from "@/services/bookService";
import BorrowService from "@/services/borrowService";
import { getCookieValue } from "@/lib/auth";
import { Book, Borrow } from "@/types/type";

export default function StudentDashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<Borrow[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [activeTab, setActiveTab] = useState<"catalog" | "my-books" | "borrowed">("catalog");
  const [userName, setUserName] = useState("Student");
  const [borrowingId, setBorrowingId] = useState<string | null>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const result = await BookService.getAllBooks({
        search: search || undefined,
        status: statusFilter === "all" ? undefined : statusFilter,
        page: currentPage,
        limit: 6,
      });
      setBooks(result.data);
      setTotalPages(result.pagination.totalPages);
      setTotalBooks(result.pagination.totalBooks);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBorrowedBooks = async () => {
    try {
      const result = await BorrowService.getMyBorrows();
      setBorrowedBooks(result.borrows || []);
    } catch (error) {
      console.error("Failed to fetch borrowed books:", error);
    }
  };

  // fetch on mount and when filters change
  useEffect(() => {
    fetchBooks();
    fetchBorrowedBooks();
  }, [currentPage, statusFilter]);

  // search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchBooks();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const visibleBooks = activeTab === "borrowed" ? books.filter((book) => book.status === "borrowed") : books;

  const handleBorrow = async (bookId: string) => {
    setBorrowingId(bookId);

    try {
      await BorrowService.borrowBook(bookId);
      await fetchBooks();
      await fetchBorrowedBooks();
    } catch (error) {
      console.error("Failed to borrow book:", error);
    } finally {
      setBorrowingId(null);
    }
  };

  useEffect(() => {
    const storedName = getCookieValue("username");
    if (storedName) {
      setUserName(decodeURIComponent(storedName));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#FDFCFB] min-h-screen flex flex-col">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm flex justify-between items-center px-6 md:px-16 h-20">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => {
              setActiveTab("catalog");
              document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="text-xl font-bold text-[#041534] hover:text-[#835500] transition-colors"
          >
            Bookshelf
          </button>
          <div className="hidden md:flex gap-6 items-center">
            <button
              type="button"
              onClick={() => setActiveTab("catalog")}
              className={`text-sm font-semibold transition-colors ${activeTab === "catalog" ? "text-[#835500] border-b-2 border-[#835500]" : "text-gray-500 hover:text-[#041534]"}`}
            >
              Catalog
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("my-books")}
              className={`text-sm font-semibold transition-colors ${activeTab === "my-books" ? "text-[#835500] border-b-2 border-[#835500]" : "text-gray-500 hover:text-[#041534]"}`}
            >
              My Books
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("borrowed")}
              className={`text-sm font-semibold transition-colors ${activeTab === "borrowed" ? "text-[#835500] border-b-2 border-[#835500]" : "text-gray-500 hover:text-[#041534]"}`}
            >
              Borrowed
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors" aria-label="Notifications">
            <PiBellSimpleRinging className="h-5 w-5" />
          </button>
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Profile menu"
              aria-expanded={profileMenuOpen}
            >
              <PiUserCircle className="h-7 w-7" />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-gray-200 bg-white/95 shadow-xl backdrop-blur-xl py-2 z-50">
                <button
                  type="button"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    AuthService.logout();
                  }}
                  className="w-full px-4 py-2 text-left text-sm font-semibold text-[#041534] hover:bg-gray-100 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="mt-20 pt-12 pb-24 px-6 md:px-16 max-w-360 mx-auto w-full">

        {/* Hero */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#041534] mb-2">
            Welcome back, {userName}
          </h1>
          <p className="text-lg text-gray-500">
            Find your next favorite story at{" "}
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
                      <PiMagnifyingGlass className="h-4 w-4" />
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
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#041534]/20 transition-all outline-none text-sm font-semibold min-w-32.5"
                    >
                      <option value="all">All Status</option>
                      <option value="available">Available</option>
                      <option value="borrowed">Borrowed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Book Catalog */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-[#041534]">
                    {activeTab === "borrowed" ? "Borrowed Books" : activeTab === "my-books" ? "My Books" : "Book Catalog"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {activeTab === "borrowed"
                      ? "Books currently borrowed by you."
                      : activeTab === "my-books"
                        ? "See available and borrowed books in one view."
                        : "Browse the full catalog and manage your reading list."}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{visibleBooks.length} books</span>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="bg-white/70 border border-white/30 p-4 rounded-3xl animate-pulse">
                      <div className="aspect-3/4 bg-gray-200 rounded-2xl mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded mb-4 w-2/3"></div>
                      <div className="h-10 bg-gray-200 rounded-xl"></div>
                    </div>
                  ))}
                </div>
              ) : visibleBooks.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-5xl mb-4"><PiBookOpenText className="mx-auto" /></p>
                  <p className="text-lg font-semibold">No books found</p>
                  <p className="text-sm mt-1">Try a different search or filter</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleBooks.map((book) => (
                    <div
                      key={book._id}
                      className="bg-white/70 backdrop-blur-xl border border-white/30 p-4 rounded-3xl hover:-translate-y-1 transition-all duration-300 flex flex-col group shadow-sm"
                    >
                      <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-md mb-4 bg-gray-100 flex items-center justify-center">
                        <span className="text-6xl"><PiBookOpenText className="h-14 w-14 text-[#041534]/40" /></span>
                        <div className={`absolute top-3 right-3 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full ${
                          book.status === "available"
                            ? "bg-amber-400/90 text-amber-900"
                            : "bg-gray-200/90 text-gray-600"
                        }`}>
                          {book.status === "available" ? "Available" : "Borrowed"}
                        </div>
                      </div>
                      <div className="grow">
                        <h3 className="text-sm font-semibold text-[#041534] line-clamp-1">{book.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{book.author}</p>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                          <span>{book.genre}</span>
                          <span>{book.publishedYear}</span>
                        </div>
                      </div>
                      {book.status === "available" ? (
                        <button
                          onClick={() => handleBorrow(book._id)}
                          disabled={borrowingId === book._id}
                          className="mt-4 w-full bg-[#1b2a4a] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#041534] transition-colors active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {borrowingId === book._id ? "Borrowing..." : "Borrow"}
                        </button>
                      ) : (
                        <button disabled className="mt-4 w-full bg-gray-100 text-gray-400 py-2.5 rounded-xl text-sm font-semibold cursor-not-allowed">
                          Unavailable
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-[#041534] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <PiArrowLeft className="h-4 w-4" /> Previous
                  </button>
                  <span className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-[#041534] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next <PiArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </section>

            {activeTab === "catalog" && (
              <section id="borrowed">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-[#041534]">My Borrowed Books</h2>
                </div>
                {borrowedBooks.length === 0 ? (
                  <div className="text-center py-16 bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl">
                    <p className="text-5xl mb-4"><PiBooks className="mx-auto" /></p>
                    <p className="text-lg font-semibold text-[#041534]">No borrowed books yet</p>
                    <p className="text-sm text-gray-500 mt-1">Browse the catalog and borrow a book</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {borrowedBooks.map((entry) => (
                      <article key={entry.borrowId} className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row gap-4">
                        <div className="w-16 h-20 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                          <PiBookOpenText className="h-7 w-7 text-[#041534]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#041534]">{entry.book.title}</p>
                          <p className="text-xs text-gray-500 mt-1">by {entry.book.author}</p>
                          <p className="text-xs text-gray-400 mt-2">Due: {new Date(entry.dueDate).toLocaleDateString()}</p>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900 self-start sm:ml-auto">
                          {entry.status}
                        </span>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/70 backdrop-blur-xl border border-white/30 p-8 rounded-4xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#041534] mb-6">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { icon: <PiBookOpenText className="h-5 w-5 text-[#041534]" />, label: "Borrowing History" },
                  { icon: <PiBellSimpleRinging className="h-5 w-5 text-[#041534]" />, label: "Due Date Alerts" },
                  { icon: <PiEnvelopeSimple className="h-5 w-5 text-[#041534]" />, label: "Contact Librarian" },
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
                    <span className="ml-auto text-gray-300"><PiArrowRight className="h-4 w-4" /></span>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-6 bg-[#041534] text-white rounded-2xl relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 text-white/10 text-[120px]"><PiBooks className="h-28 w-28" /></div>
                <p className="text-xs font-semibold text-[#8392b7] mb-1 uppercase tracking-wider">Total Books</p>
                <p className="text-3xl font-bold text-white mb-1">{totalBooks}</p>
                <p className="text-xs text-[#8392b7]">in the library</p>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/30 p-8 rounded-4xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#041534] mb-2">Need Help?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Our librarians are here to help you find what you&apos;re looking for.
              </p>
              <button className="w-full py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#041534] hover:bg-[#041534]/5 transition-all">
                Chat with Us
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto bg-[#eeeeee] border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-12 max-w-360 mx-auto gap-6">
          <div className="text-center md:text-left">
            <span className="text-xl font-bold text-[#041534]">Bookshelf</span>
            <p className="text-sm text-gray-500 mt-1">© 2024 Bookshelf Management System</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {["Privacy Policy", "Terms of Service", "Library Hours", "Contact Us"].map((link) => (
              <a key={link} href="#" className="text-sm text-gray-500 hover:text-[#041534] transition-all underline decoration-[#835500] underline-offset-4">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}