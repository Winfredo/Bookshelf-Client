"use client";

import { useState } from "react";
import Link from "next/link";
import { FiBarChart2, FiBook, FiUsers, FiRefreshCw, FiTrendingUp, FiSettings, FiHelpCircle, FiMenu, FiCalendar, FiEdit, FiTrash2, FiX, FiAlertTriangle } from "react-icons/fi";
import { recentBooks, circulationData, navItems } from "@/constants/constants";



export default function LibrarianDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="bg-[#FDFCFB] min-h-screen flex">

      {/* Sidebar */}
      <aside
        className={`h-screen w-64 fixed left-0 top-0 bg-[#041534] flex flex-col py-8 shadow-xl z-50 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-6 mb-10">
          <h1 className="text-xl font-bold text-white">Bookshelf Portal</h1>
          <p className="text-[#8392b7] text-sm mt-1">Central Branch</p>
        </div>

        {/* Nav Items */}
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

        {/* Add New Book Button */}
        <div className="px-4 mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full bg-linear-to-tr from-[#835500] to-[#feae2c] text-white text-sm font-semibold py-3 rounded-full shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            + Add New Book
          </button>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-[#1b2a4a] pt-4 space-y-1">
          <a href="#" className="text-[#8392b7] hover:text-white flex items-center gap-3 p-3 mx-2 text-sm">
            <FiSettings /> <span>Settings</span>
          </a>
          <a href="#" className="text-[#8392b7] hover:text-white flex items-center gap-3 p-3 mx-2 text-sm">
            <FiHelpCircle /> <span>Support</span>
          </a>
        </div>

        {/* Profile */}
        <div className="mt-4 px-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#feae2c] flex items-center justify-center text-[#041534] font-bold text-sm">
            EV
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-sm font-semibold truncate">Eleanor Vance</p>
            <p className="text-[#8392b7] text-xs">Librarian</p>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 flex-1 min-h-screen px-6 md:px-16 py-12 pb-24">

        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#041534] text-2xl"
          >
            <FiMenu />
          </button>
          <span className="text-lg font-bold text-[#041534]">Bookshelf Portal</span>
          <div className="w-8" />
        </div>

        {/* Header */}
        <header className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#041534] mb-2">
              Welcome back, Eleanor
            </h2>
            <p className="text-gray-500 text-lg">Your library overview for today.</p>
          </div>
          <div className="flex gap-4">
              <div className="bg-white/70 backdrop-blur-xl border border-white/30 px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
              <FiCalendar className="text-[#041534]" />
              <span className="text-sm font-semibold text-gray-700">Daily Report</span>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Total Books */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 border-r-4 border-r-[#041534] p-6 rounded-4xl shadow-sm flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Books</p>
                <h3 className="text-4xl font-bold text-[#041534]">24,892</h3>
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
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 border-r-4 border-r-[#835500] p-6 rounded-4xl shadow-sm flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Active Borrows</p>
                <h3 className="text-4xl font-bold text-[#041534]">1,104</h3>
              </div>
              <div className="bg-[#835500]/10 p-2 rounded-xl">
                <FiRefreshCw className="text-xl" />
              </div>
            </div>
            <svg className="w-full h-12 mt-4" viewBox="0 0 100 30">
              <path d="M0 20 Q 20 5, 40 25 T 60 15 T 80 20 T 100 5" fill="none" stroke="#835500" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          {/* Overdue Borrows */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 border-r-4 border-r-red-500 p-6 rounded-4xl shadow-sm flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Overdue Borrows</p>
                <h3 className="text-4xl font-bold text-[#041534]">42</h3>
              </div>
              <div className="bg-red-100 p-2 rounded-xl">
                <FiAlertTriangle className="text-xl" />
              </div>
            </div>
            <svg className="w-full h-12 mt-4" viewBox="0 0 100 30">
              <path d="M0 5 Q 20 25, 40 10 T 60 20 T 80 5 T 100 25" fill="none" stroke="#ba1a1a" strokeWidth="2" vectorEffect="non-scaling-stroke" />
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
                  <img
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={book.img}
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-[#041534] truncate">{book.title}</h4>
                  <p className="text-xs text-gray-500 mb-3">{book.author}, {book.year}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-[#041534]/5 text-[#041534] px-3 py-1 rounded-full text-xs font-medium">
                      {book.genre}
                    </span>
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

        {/* Circulation Table */}
        <section>
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-4xl overflow-hidden shadow-sm">
            <div className="px-6 md:px-8 py-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-2xl font-semibold text-[#041534]">Live Circulation</h3>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-[#feae2c]"></span> Borrowed
                </span>
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span> Overdue
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 md:px-8 py-4 text-sm font-semibold text-[#041534]">Student Name</th>
                    <th className="px-6 md:px-8 py-4 text-sm font-semibold text-[#041534]">Book Title</th>
                    <th className="px-6 md:px-8 py-4 text-sm font-semibold text-[#041534] hidden md:table-cell">Borrow Date</th>
                    <th className="px-6 md:px-8 py-4 text-sm font-semibold text-[#041534]">Due Date</th>
                    <th className="px-6 md:px-8 py-4 text-sm font-semibold text-[#041534]">Status</th>
                    <th className="px-6 md:px-8 py-4 text-sm font-semibold text-[#041534]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {circulationData.map((row) => (
                    <tr key={row.name} className="hover:bg-white/40 transition-colors">
                      <td className="px-6 md:px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#041534]/10 flex items-center justify-center text-[#041534] font-bold text-xs shrink-0">
                            {row.initials}
                          </div>
                          <span className="text-sm text-gray-800 font-medium">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-6 md:px-8 py-5 text-sm text-gray-800">{row.book}</td>
                      <td className="px-6 md:px-8 py-5 text-sm text-gray-500 hidden md:table-cell">{row.borrowDate}</td>
                      <td className={`px-6 md:px-8 py-5 text-sm font-medium ${row.status === "overdue" ? "text-red-500" : "text-gray-500"}`}>
                        {row.dueDate}
                      </td>
                      <td className="px-6 md:px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          row.status === "overdue"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {row.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 md:px-8 py-5">
                        <button className="text-gray-400 hover:text-[#835500] transition-colors text-lg">
                          •••
                        </button>
                      </td>
                    </tr>
                  ))}
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
            <a key={link} href="#" className="text-xs text-gray-500 hover:text-[#041534] transition-colors">
              {link}
            </a>
          ))}
        </div>
      </footer>

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-4xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#041534]">Add New Book</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-700 text-2xl transition-colors"
              >
                <FiX />
              </button>
            </div>
            <div className="space-y-4">
              {["Title", "Author", "Genre", "Published Year"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-[#041534] mb-1">{field}</label>
                  <input
                    type={field === "Published Year" ? "number" : "text"}
                    placeholder={`Enter ${field.toLowerCase()}`}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 rounded-full border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 rounded-full bg-[#041534] text-white text-sm font-semibold hover:bg-[#1b2a4a] transition-all">
                Save Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}