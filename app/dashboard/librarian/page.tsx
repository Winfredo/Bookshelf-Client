"use client";

import { useState, useEffect } from "react";
import {
  PiHouse,
  PiBooks,
  PiUsers,
  PiPlus,
  PiGear,
  PiSignOut,
  PiList,
  PiX,
  PiWarning,
  PiArrowLeft,
  PiHandCoins,
  PiArrowRight,
  PiPencil,
  PiTrash,
  PiBookOpen,
} from "react-icons/pi";
import AuthService from "@/services/authService";
import BookService from "@/services/bookService";
import BorrowService from "@/services/borrowService";
import { Book, Borrow } from "@/types/type";

type Tab = "dashboard" | "inventory" | "members" | "borrows";

interface Member {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export default function LibrarianDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Dashboard state
  const [recentBorrows, setRecentBorrows] = useState<Borrow[]>([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [activeBorrows, setActiveBorrows] = useState(0);
  const [overdueBorrows, setOverdueBorrows] = useState(0);

  // Inventory state
  const [books, setBooks] = useState<Book[]>([]);
  const [bookPage, setBookPage] = useState(1);
  const [bookTotalPages, setBookTotalPages] = useState(1);
  const [bookSearch, setBookSearch] = useState("");
  const [booksLoading, setBooksLoading] = useState(false);

  // Borrows state
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [borrowPage, setBorrowPage] = useState(1);
  const [borrowTotalPages, setBorrowTotalPages] = useState(1);
  const [borrowsLoading, setBorrowsLoading] = useState(false);

  // Members state
  const [members, setMembers] = useState<Member[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);

  // Form state
  const [addForm, setAddForm] = useState({ title: "", author: "", genre: "", publishedYear: "" });
  const [adding, setAdding] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  //delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState(false);

  const BORROWS_PER_PAGE = 10;
  const BOOKS_PER_PAGE = 8;

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setDashboardLoading(true);
    try {
      const [booksResult, borrowsResult, overdueResult] = await Promise.all([
        BookService.getAllBooks({ limit: 4 }),
        BorrowService.getAllBorrows(),
        BorrowService.getOverdueBorrows(),
      ]);
      setTotalBooks(booksResult.pagination.totalBooks);
      setRecentBorrows(borrowsResult.borrows.slice(0, 5));
      setActiveBorrows(borrowsResult.borrows.filter((b) => b.status === "active").length);
      setOverdueBorrows(overdueResult.count);
    } catch (error) {
      console.error("Dashboard fetch failed:", error);
    } finally {
      setDashboardLoading(false);
    }
  };

  // Fetch all books for inventory
  const fetchBooks = async () => {
    setBooksLoading(true);
    try {
      const result = await BookService.getAllBooks({
        search: bookSearch || undefined,
        page: bookPage,
        limit: BOOKS_PER_PAGE,
      });
      setBooks(result.data);
      setBookTotalPages(result.pagination.totalPages);
      setTotalBooks(result.pagination.totalBooks);
    } catch (error) {
      console.error("Books fetch failed:", error);
    } finally {
      setBooksLoading(false);
    }
  };

  // Fetch all borrows
  const fetchBorrows = async () => {
    setBorrowsLoading(true);
    try {
      const result = await BorrowService.getAllBorrows();
      const allBorrows = result.borrows;
      setBorrowTotalPages(Math.ceil(allBorrows.length / BORROWS_PER_PAGE));
      const start = (borrowPage - 1) * BORROWS_PER_PAGE;
      setBorrows(allBorrows.slice(start, start + BORROWS_PER_PAGE));
    } catch (error) {
      console.error("Borrows fetch failed:", error);
    } finally {
      setBorrowsLoading(false);
    }
  };

  // Fetch members
  const fetchMembers = async () => {
    setMembersLoading(true);
    try {
      const result = await fetch("http://localhost:4000/users", {
        headers: {
          Authorization: `Bearer ${document.cookie.match(/accessToken=([^;]+)/)?.[1]}`,
        },
      });
      const data = await result.json();
      setMembers(data.users || []);
    } catch (error) {
      console.error("Members fetch failed:", error);
    } finally {
      setMembersLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (activeTab === "inventory") fetchBooks();
  }, [activeTab, bookPage, bookSearch]);

  useEffect(() => {
    if (activeTab === "borrows") fetchBorrows();
  }, [activeTab, borrowPage]);

  useEffect(() => {
    if (activeTab === "members") fetchMembers();
  }, [activeTab]);

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      await BookService.createBook({
        title: addForm.title,
        author: addForm.author,
        genre: addForm.genre,
        publishedYear: parseInt(addForm.publishedYear),
      });
      setShowAddModal(false);
      setAddForm({ title: "", author: "", genre: "", publishedYear: "" });
      fetchBooks();
      fetchDashboardData();
    } catch (error) {
      console.error("Add book failed:", error);
    } finally {
      setAdding(false);
    }
  };

 const handleDeleteBook = async () => {
  if (!deletingBook) return;
  setDeleting(true);
  try {
    await BookService.deleteBook(deletingBook._id);
    setShowDeleteModal(false);
    setDeletingBook(null);
    fetchBooks();
    fetchDashboardData();
  } catch (error) {
    console.error("Delete book failed:", error);
  } finally {
    setDeleting(false);
  }
};

  const handleEditBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;
    try {
      await BookService.updateBook(editingBook._id, {
        title: editingBook.title,
        author: editingBook.author,
        genre: editingBook.genre,
        publishedYear: editingBook.publishedYear,
      });
      setShowEditModal(false);
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      console.error("Edit book failed:", error);
    }
  };

  const navItems = [
    { id: "dashboard" as Tab, label: "Dashboard", icon: <PiHouse className="h-5 w-5" /> },
    { id: "inventory" as Tab, label: "Inventory", icon: <PiBooks className="h-5 w-5" /> },
    { id: "members" as Tab, label: "Members", icon: <PiUsers className="h-5 w-5" /> },
    { id: "borrows" as Tab, label: "Borrows", icon: <PiHandCoins className="h-5 w-5" /> },
  ];

  return (
    <div className="bg-[#FDFCFB] min-h-screen flex">

      {/* Sidebar */}
      <aside className={`h-screen w-64 fixed left-0 top-0 bg-[#041534] flex flex-col py-8 shadow-xl z-50 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="px-6 mb-10">
          <h1 className="text-xl font-bold text-white">Bookshelf Portal</h1>
          <p className="text-[#8392b7] text-sm mt-1">Central Branch</p>
        </div>

        <div className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 mx-2 rounded-xl transition-all hover:translate-x-1 text-sm font-semibold ${
                activeTab === item.id
                  ? "bg-[#feae2c] text-[#6b4500]"
                  : "text-[#8392b7] hover:text-white hover:bg-[#1b2a4a]"
              }`}
              style={{ width: "calc(100% - 16px)" }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="px-4 mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full bg-linear-to-tr from-[#835500] to-[#feae2c] text-white text-sm font-semibold py-3 rounded-full shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <PiPlus className="h-4 w-4" /> Add New Book
          </button>
        </div>

        <div className="border-t border-[#1b2a4a] pt-4 space-y-1">
          <a href="#" className="text-[#8392b7] hover:text-white flex items-center gap-3 p-3 mx-2 text-sm">
            <PiGear className="h-4 w-4" /> <span>Settings</span>
          </a>
          <button
            onClick={() => AuthService.logout()}
            className="text-[#8392b7] hover:text-white flex items-center gap-3 p-3 mx-2 text-sm w-full"
          >
            <PiSignOut className="h-4 w-4" /> <span>Sign Out</span>
          </button>
        </div>

        <div className="mt-4 px-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#feae2c] flex items-center justify-center text-[#041534] font-bold text-sm">LB</div>
          <div className="overflow-hidden">
            <p className="text-white text-sm font-semibold truncate">Librarian</p>
            <p className="text-[#8392b7] text-xs">Administrator</p>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 flex-1 min-h-screen px-4 md:px-8 lg:px-16 py-8 pb-24">

        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-[#041534]">
            <PiList className="h-6 w-6" />
          </button>
          <span className="text-lg font-bold text-[#041534]">Bookshelf Portal</span>
          <div className="w-6" />
        </div>

        {/* ── DASHBOARD TAB ── */}
        {activeTab === "dashboard" && (
          <>
            <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#041534] mb-1">Dashboard</h2>
                <p className="text-gray-500">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
              </div>
            </header>

            {/* Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {[
                { label: "Total Books", value: totalBooks, color: "border-r-[#041534]", icon: <PiBookOpen className="h-5 w-5 text-[#041534]" /> },
                { label: "Active Borrows", value: activeBorrows, color: "border-r-[#835500]", icon: <PiArrowLeft className="h-5 w-5 text-[#835500]" /> },
                { label: "Overdue Borrows", value: overdueBorrows, color: "border-r-red-500", icon: <PiWarning className="h-5 w-5 text-red-500" /> },
              ].map((stat) => (
                <div key={stat.label} className={`bg-white/70 backdrop-blur-xl border border-white/30 ${stat.color} border-r-4 p-6 rounded-4xl shadow-sm`}>
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                    <div className="bg-gray-100 p-2 rounded-xl">{stat.icon}</div>
                  </div>
                  <h3 className="text-4xl font-bold text-[#041534]">
                    {dashboardLoading ? "..." : stat.value}
                  </h3>
                </div>
              ))}
            </section>

            {/* Live Circulation — last 5 */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#041534]">Live Circulation</h3>
                <button
                  onClick={() => setActiveTab("borrows")}
                  className="text-sm font-semibold text-[#835500] hover:underline flex items-center gap-1"
                >
                  View All <PiArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-4xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  {dashboardLoading ? (
                    <div className="p-8 text-center text-gray-400">Loading...</div>
                  ) : recentBorrows.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No circulation records yet</div>
                  ) : (
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-4 text-sm font-semibold text-[#041534]">Student</th>
                          <th className="px-6 py-4 text-sm font-semibold text-[#041534]">Book</th>
                          <th className="px-6 py-4 text-sm font-semibold text-[#041534] hidden md:table-cell">Borrowed</th>
                          <th className="px-6 py-4 text-sm font-semibold text-[#041534]">Due</th>
                          <th className="px-6 py-4 text-sm font-semibold text-[#041534]">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {recentBorrows.map((borrow) => (
                          <tr key={borrow.borrowId} className="hover:bg-white/40 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#041534]/10 flex items-center justify-center text-[#041534] font-bold text-xs shrink-0">
                                  {borrow.student?.username?.slice(0, 2).toUpperCase() || "??"}
                                </div>
                                <span className="text-sm font-medium text-gray-800">{borrow.student?.username || "Unknown"}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800">{borrow.book?.title || "Unknown"}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{new Date(borrow.borrowedAt).toLocaleDateString()}</td>
                            <td className={`px-6 py-4 text-sm font-medium ${borrow.status === "overdue" ? "text-red-500" : "text-gray-500"}`}>
                              {new Date(borrow.dueDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                borrow.status === "overdue" ? "bg-red-100 text-red-700" :
                                borrow.status === "returned" ? "bg-green-100 text-green-700" :
                                "bg-amber-100 text-amber-700"
                              }`}>
                                {borrow.status.toUpperCase()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ── INVENTORY TAB ── */}
        {activeTab === "inventory" && (
          <>
            <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#041534] mb-1">Inventory</h2>
                <p className="text-gray-500">{totalBooks} books in the library</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#041534] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#1b2a4a] transition-all flex items-center gap-2"
              >
                <PiPlus className="h-4 w-4" /> Add New Book
              </button>
            </header>

            {/* Search */}
            <div className="bg-white/70 border border-white/30 p-4 rounded-2xl shadow-sm mb-6">
              <div className="relative">
                <input
                  value={bookSearch}
                  onChange={(e) => { setBookSearch(e.target.value); setBookPage(1); }}
                  placeholder="Search by title, author or genre..."
                  className="w-full pl-4 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#041534]/20 outline-none text-sm"
                />
              </div>
            </div>

            {booksLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1,2,3,4,5,6,7,8].map((n) => (
                  <div key={n} className="bg-white/70 border border-white/30 rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <PiBooks className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-semibold">No books found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                  <div key={book._id} className="group bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="h-48 bg-linear-to-br from-[#041534]/5 to-amber-50 flex items-center justify-center">
                      <PiBookOpen className="h-16 w-16 text-[#041534]/30" />
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-semibold text-[#041534] truncate">{book.title}</h4>
                      <p className="text-xs text-gray-500 mb-1">{book.author}</p>
                      <p className="text-xs text-gray-400 mb-3">{book.publishedYear}</p>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          book.status === "available" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {book.status}
                        </span>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => { setEditingBook(book); setShowEditModal(true); }}
                            className="p-1.5 hover:text-[#835500] text-gray-400 transition-colors"
                          >
                            <PiPencil className="h-4 w-4" />
                          </button>
                          <button
  onClick={() => { setDeletingBook(book); setShowDeleteModal(true); }}
  className="p-1.5 hover:text-red-500 text-gray-400 transition-colors"
>
  <PiTrash className="h-4 w-4" />
</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {bookTotalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-8">
                <button
                  onClick={() => setBookPage((p) => Math.max(1, p - 1))}
                  disabled={bookPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-[#041534] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <PiArrowLeft className="h-4 w-4" /> Previous
                </button>
                <span className="text-sm text-gray-500">Page {bookPage} of {bookTotalPages}</span>
                <button
                  onClick={() => setBookPage((p) => Math.min(bookTotalPages, p + 1))}
                  disabled={bookPage === bookTotalPages}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-[#041534] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next <PiArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* ── MEMBERS TAB ── */}
        {activeTab === "members" && (
          <>
            <header className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#041534] mb-1">Members</h2>
              <p className="text-gray-500">All registered students</p>
            </header>

            {membersLoading ? (
              <div className="text-center py-20 text-gray-400">Loading members...</div>
            ) : members.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <PiUsers className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-semibold">No members found</p>
                <p className="text-sm mt-1">Members API endpoint needed — add GET /users to your backend</p>
              </div>
            ) : (
              <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-4xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-4 text-sm font-semibold text-[#041534]">Student</th>
                      <th className="px-6 py-4 text-sm font-semibold text-[#041534]">Email</th>
                      <th className="px-6 py-4 text-sm font-semibold text-[#041534]">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {members.map((member) => (
                      <tr key={member._id} className="hover:bg-white/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-[#041534] font-bold text-xs">
                              {member.username.slice(0, 2).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-gray-800">{member.username}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{member.email}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                            {member.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ── BORROWS TAB ── */}
        {activeTab === "borrows" && (
          <>
            <header className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#041534] mb-1">All Borrows</h2>
              <p className="text-gray-500">Complete borrowing history</p>
            </header>

            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-4xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                {borrowsLoading ? (
                  <div className="p-8 text-center text-gray-400">Loading borrows...</div>
                ) : borrows.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    <PiArrowLeft className="h-12 w-12 mx-auto mb-4" />
                    <p>No borrow records found</p>
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-4 text-sm font-semibold text-[#041534]">Student</th>
                        <th className="px-6 py-4 text-sm font-semibold text-[#041534]">Book</th>
                        <th className="px-6 py-4 text-sm font-semibold text-[#041534] hidden md:table-cell">Borrowed</th>
                        <th className="px-6 py-4 text-sm font-semibold text-[#041534]">Due Date</th>
                        <th className="px-6 py-4 text-sm font-semibold text-[#041534]">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {borrows.map((borrow) => (
                        <tr key={borrow.borrowId} className="hover:bg-white/40 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#041534]/10 flex items-center justify-center text-[#041534] font-bold text-xs shrink-0">
                                {borrow.student?.username?.slice(0, 2).toUpperCase() || "??"}
                              </div>
                              <span className="text-sm font-medium text-gray-800">{borrow.student?.username || "Unknown"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800">{borrow.book?.title || "Unknown"}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{new Date(borrow.borrowedAt).toLocaleDateString()}</td>
                          <td className={`px-6 py-4 text-sm font-medium ${borrow.status === "overdue" ? "text-red-500" : "text-gray-500"}`}>
                            {new Date(borrow.dueDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              borrow.status === "overdue" ? "bg-red-100 text-red-700" :
                              borrow.status === "returned" ? "bg-green-100 text-green-700" :
                              "bg-amber-100 text-amber-700"
                            }`}>
                              {borrow.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination */}
              {borrowTotalPages > 1 && (
                <div className="flex justify-center items-center gap-3 p-6 border-t border-gray-100">
                  <button
                    onClick={() => setBorrowPage((p) => Math.max(1, p - 1))}
                    disabled={borrowPage === 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-[#041534] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <PiArrowLeft className="h-4 w-4" /> Previous
                  </button>
                  <span className="text-sm text-gray-500">Page {borrowPage} of {borrowTotalPages}</span>
                  <button
                    onClick={() => setBorrowPage((p) => Math.min(borrowTotalPages, p + 1))}
                    disabled={borrowPage === borrowTotalPages}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-[#041534] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next <PiArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 lg:left-64 right-0 bg-[#eeeeee]/80 backdrop-blur-md border-t border-gray-200 flex justify-between items-center px-6 md:px-16 py-3 z-40">
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
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-700">
                <PiX className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddBook} className="space-y-4">
              {[
                { label: "Title", key: "title", type: "text" },
                { label: "Author", key: "author", type: "text" },
                { label: "Genre", key: "genre", type: "text" },
                { label: "Published Year", key: "publishedYear", type: "number" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold text-[#041534] mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    value={addForm[field.key as keyof typeof addForm]}
                    onChange={(e) => setAddForm({ ...addForm, [field.key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm"
                    required
                  />
                </div>
              ))}
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 rounded-full border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" disabled={adding} className="flex-1 py-3 rounded-full bg-[#041534] text-white text-sm font-semibold hover:bg-[#1b2a4a] disabled:opacity-70">
                  {adding ? "Saving..." : "Save Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {showEditModal && editingBook && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#041534]">Edit Book</h3>
              <button onClick={() => { setShowEditModal(false); setEditingBook(null); }} className="text-gray-400 hover:text-gray-700">
                <PiX className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleEditBook} className="space-y-4">
              {[
                { label: "Title", key: "title" },
                { label: "Author", key: "author" },
                { label: "Genre", key: "genre" },
                { label: "Published Year", key: "publishedYear" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold text-[#041534] mb-1">{field.label}</label>
                  <input
                    type={field.key === "publishedYear" ? "number" : "text"}
                    value={editingBook[field.key as keyof Book] as string}
                    onChange={(e) => setEditingBook({ ...editingBook, [field.key]: field.key === "publishedYear" ? parseInt(e.target.value) : e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm"
                    required
                  />
                </div>
              ))}
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => { setShowEditModal(false); setEditingBook(null); }} className="flex-1 py-3 rounded-full border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 rounded-full bg-[#041534] text-white text-sm font-semibold hover:bg-[#1b2a4a]">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
{showDeleteModal && deletingBook && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-4xl p-8 w-full max-w-sm shadow-2xl">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <PiTrash className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-[#041534] mb-2">Delete Book</h3>
        <p className="text-gray-500 text-sm">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#041534]">{deletingBook.title}</span>?
          This action cannot be undone.
        </p>
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => { setShowDeleteModal(false); setDeletingBook(null); }}
          className="flex-1 py-3 rounded-full border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50 transition-all"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDeleteBook}
          disabled={deleting}
          className="flex-1 py-3 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all disabled:opacity-70"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}