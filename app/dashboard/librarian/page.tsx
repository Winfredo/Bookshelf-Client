"use client";

import { useState, useEffect } from "react";
import {
  FiBook,
  FiUsers,
  FiRefreshCw,
  FiSettings,
  FiHelpCircle,
  FiMenu,
  FiCalendar,
  FiEdit,
  FiTrash2,
  FiX,
  FiAlertTriangle,
} from "react-icons/fi";
import { recentBooks, navItems } from "@/constants/constants";
import { getCookieValue } from "@/lib/auth";
import AuthService from "@/services/authService";
import BookService from "@/services/bookService";
import BorrowService from "@/services/borrowService";
import { Book, Borrow } from "@/types/type";

export default function LibrarianDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [librarianName, setLibrarianName] = useState("Librarian");
  const [currentDate, setCurrentDate] = useState("");

  // Data states
  const [totalBooks, setTotalBooks] = useState(0);
  const [borrowedBooks, setBorrowedBooks] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);

  // Add book form states
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get librarian name from cookie
    const name = getCookieValue("username");
    if (name && name !== "undefined") {
      setLibrarianName(decodeURIComponent(name));
    }

    // Set date on client only (prevents hydration mismatch)
    setCurrentDate(new Date().toLocaleDateString());

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);

    // ✅ Each fetch is independent — one failure won't break the rest
    await Promise.allSettled([
      fetchBooks(),
      fetchBorrows(),
    ]);

    setLoading(false);
  };

  const fetchBooks = async () => {
    try {
      const res = await BookService.getAllBooks({ limit: 100 });
      setTotalBooks(res.pagination.totalBooks);
    } catch (error) {
      console.error("[LibrarianDashboard] Failed to fetch books:", error);
    }
  };

  const fetchBorrows = async () => {
    try {
      const res = await BorrowService.getAllBorrows();
      setBorrowedBooks(res.borrows ?? []);
    } catch (error) {
      console.error("[LibrarianDashboard] Failed to fetch borrows:", error);
    }
  };

  const activeBorrows = borrowedBooks.filter((b) => b.status !== "returned").length;
  const overdueBorrows = borrowedBooks.filter((b) => b.status === "overdue").length;

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await BookService.createBook({
        title: formData.title,
        author: formData.author,
        genre: formData.genre,
        publishedYear: formData.publishedYear, // ✅ fixed: matches backend field name
      });

      setFormData({ title: "", author: "", genre: "", publishedYear: 0 });
      setShowAddModal(false);
      await fetchBooks();
    } catch (error) {
      console.error("[LibrarianDashboard] Failed to add book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    setShowSettingsMenu(false);
    AuthService.logout();
  };

  return (
    <div className="bg-[#FDFCFB] min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`h-screen w-64 fixed left-0 top-0 bg-[#041534] flex flex-col py-8 shadow-xl z-50 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="px-6 mb-10">
          <h1 className="text-xl font-bold text-white">Bookshelf Portal</h1>
          <p className="text-[#8392b7] text-sm mt-1">Central Branch</p>
        </div>

        <div className="flex-1 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 p-3 mx-2 rounded-xl transition-all hover:translate-x-1 text-sm font-semibold ${item.active ? "bg-[#feae2c] text-[#6b4500]" : "text-[#8392b7] hover:text-white hover:bg-[#1b2a4a]"}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <div className="px-4 mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full bg-linear-to-tr from-[#835500] to-[#feae2c] text-white text-sm font-semibold py-3 rounded-full shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            + Add New Book
          </button>
        </div>

        <div className="border-t border-[#1b2a4a] pt-4 space-y-1">
          <a href="#" className="text-[#8392b7] hover:text-white flex items-center gap-3 p-3 mx-2 text-sm">
            <FiSettings /> <span>Settings</span>
          </a>
          <a href="#" className="text-[#8392b7] hover:text-white flex items-center gap-3 p-3 mx-2 text-sm">
            <FiHelpCircle /> <span>Support</span>
          </a>
        </div>

        <div className="mt-4 px-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#feae2c] flex items-center justify-center text-[#041534] font-bold text-sm">
            {librarianName.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-sm font-semibold truncate">{librarianName}</p>
            <p className="text-[#8392b7] text-xs">Librarian</p>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 flex-1 min-h-screen px-6 md:px-16 py-12 pb-24">
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-[#041534] text-2xl">
            <FiMenu />
          </button>
          <span className="text-lg font-bold text-[#041534]">Bookshelf Portal</span>
          <div className="w-8" />
        </div>

        <header className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#041534] mb-2">
              Welcome back, {librarianName}
            </h2>
            <p className="text-gray-500 text-lg">Your library overview for today.</p>
          </div>
          <div className="flex gap-4 relative">
            <div className="bg-white/70 backdrop-blur-xl border border-white/30 px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
              <FiCalendar className="text-[#041534]" />
              <span className="text-sm font-semibold text-gray-700">
                {currentDate || "—"}
              </span>
            </div>
            <button
              onClick={() => setShowSettingsMenu(!showSettingsMenu)}
              className="bg-white/90 text-[#041534] border border-[#d1d5db] px-4 py-2 rounded-full font-semibold hover:bg-[#f4f5f7] transition-all flex items-center gap-2"
            >
              <FiSettings className="h-4 w-4" />
              Settings
            </button>

            {showSettingsMenu && (
              <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-50 w-48">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <FiX className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Total Books */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 border-r-4 border-r-[#041534] p-6 rounded-4xl shadow-sm flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Inventory</p>
                <h3 className="text-4xl font-bold text-[#041534]">
                  {loading ? <span className="animate-pulse">—</span> : totalBooks}
                </h3>
              </div>
              <div className="bg-[#041534]/10 p-2 rounded-xl">
                <FiBook className="text-xl" />
              </div>
            </div>
            <svg className="w-full h-12 mt-4" viewBox="0 0 100 30">
              <path d="M0 25 Q 10 15, 20 20 T 40 10 T 60 22 T 80 5 T 100 15" fill="none" stroke="#041534" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          {/* Active Borrows */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 border-r-4 border-r-[#feae2c] p-6 rounded-4xl shadow-sm flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Borrowed</p>
                <h3 className="text-4xl font-bold text-[#041534]">
                  {loading ? <span className="animate-pulse">—</span> : activeBorrows}
                </h3>
              </div>
              <div className="bg-[#feae2c]/10 p-2 rounded-xl">
                <FiRefreshCw className="text-xl" />
              </div>
            </div>
            <svg className="w-full h-12 mt-4" viewBox="0 0 100 30">
              <path d="M0 5 Q 20 25, 40 10 T 60 20 T 80 5 T 100 25" fill="none" stroke="#feae2c" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          {/* Overdue */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 border-r-4 border-r-red-500 p-6 rounded-4xl shadow-sm flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Overdue</p>
                <h3 className="text-4xl font-bold text-[#041534]">
                  {loading ? <span className="animate-pulse">—</span> : overdueBorrows}
                </h3>
              </div>
              <div className="bg-red-500/10 p-2 rounded-xl">
                <FiAlertTriangle className="text-xl text-red-500" />
              </div>
            </div>
            <svg className="w-full h-12 mt-4" viewBox="0 0 100 30">
              <path d="M0 20 Q 20 5, 40 25 T 60 15 T 80 20 T 100 5" fill="none" stroke="#ef4444" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </section>

        {/* Recent Acquisitions */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-[#041534]">Recent Acquisitions</h3>
            <button className="text-[#835500] text-sm font-semibold hover:underline">
              View All Inventory
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentBooks.map((book) => (
              <div
                key={book.id}
                className="group relative bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-56 bg-gray-100 overflow-hidden">
                  <img alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={book.img} />
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-[#041534] truncate">{book.title}</h4>
                  <p className="text-xs text-gray-500 mb-3">{book.author}, {book.year}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-[#041534]/5 text-[#041534] px-3 py-1 rounded-full text-xs font-medium">{book.genre}</span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 hover:text-[#835500] text-gray-400 transition-colors"><FiEdit /></button>
                      <button className="p-1 hover:text-red-500 text-gray-400 transition-colors"><FiTrash2 /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Borrowed Books Table */}
        <section>
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-4xl overflow-hidden shadow-sm">
            <div className="px-6 md:px-8 py-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-2xl font-semibold text-[#041534]">Borrowed Books</h3>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-[#feae2c]"></span> Active</span>
                <span className="flex items-center gap-2 text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-red-500"></span> Overdue</span>
                <span className="flex items-center gap-2 text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-green-500"></span> Returned</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 md:px-8 py-4 text-sm font-semibold text-[#041534]">Student Name</th>
                    <th className="px-6 md:px-8 py-4 text-sm font-semibold text-[#041534]">Book Title</th>
                    <th className="px-6 md:px-8 py-4 text-sm font-semibold text-[#041534] hidden md:table-cell">Author</th>
                    <th className="px-6 md:px-8 py-4 text-sm font-semibold text-[#041534]">Due Date</th>
                    <th className="px-6 md:px-8 py-4 text-sm font-semibold text-[#041534]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    [...Array(3)].map((_, i) => (
                      <tr key={i}>
                        <td colSpan={5} className="px-6 md:px-8 py-5">
                          <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
                        </td>
                      </tr>
                    ))
                  ) : borrowedBooks.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 md:px-8 py-8 text-center text-gray-500">
                        No borrowed books
                      </td>
                    </tr>
                  ) : (
                    borrowedBooks.map((borrow) => (
                      <tr key={borrow.borrowId} className="hover:bg-white/40 transition-colors">
                        <td className="px-6 md:px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#041534]/10 flex items-center justify-center text-[#041534] font-bold text-xs shrink-0">
                              {borrow.student?.username?.charAt(0).toUpperCase() ?? "?"}
                            </div>
                            <span className="text-sm text-gray-800 font-medium">
                              {borrow.student?.username ?? "Unknown"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 md:px-8 py-5 text-sm text-gray-800 font-medium">
                          {borrow.book?.title ?? "—"}
                        </td>
                        <td className="px-6 md:px-8 py-5 text-sm text-gray-500 hidden md:table-cell">
                          {borrow.book?.author ?? "—"}
                        </td>
                        <td className={`px-6 md:px-8 py-5 text-sm font-medium ${borrow.status === "overdue" ? "text-red-500" : "text-gray-500"}`}>
                          {new Date(borrow.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 md:px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            borrow.status === "overdue" ? "bg-red-100 text-red-700"
                            : borrow.status === "returned" ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                          }`}>
                            {borrow.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 lg:left-64 right-0 bg-[#eeeeee]/80 backdrop-blur-md border-t border-gray-200 flex justify-between items-center px-6 md:px-16 py-4 z-40">
        <p className="text-xs text-gray-500">© 2024 Bookshelf Management System</p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Support"].map((link) => (
            <a key={link} href="#" className="text-xs text-gray-500 hover:text-[#041534] transition-colors">{link}</a>
          ))}
        </div>
      </footer>

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#041534]">Add New Book</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-700 text-2xl transition-colors">
                <FiX />
              </button>
            </div>
            <form onSubmit={handleAddBook} className="space-y-4">
              {[
                { name: "title", label: "Title", type: "text", placeholder: "Enter title" },
                { name: "author", label: "Author", type: "text", placeholder: "Enter author" },
                { name: "genre", label: "Genre", type: "text", placeholder: "Enter genre" },
                { name: "publishedYear", label: "Published Year", type: "number", placeholder: "Enter year" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-[#041534] mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.name]: field.type === "number" ? parseInt(e.target.value) || 0 : e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm transition-all"
                  />
                </div>
              ))}
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-full border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-full bg-[#041534] text-white text-sm font-semibold hover:bg-[#1b2a4a] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : "Save Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}