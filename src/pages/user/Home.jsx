// src/pages/user/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [borrowedCount, setBorrowedCount] = useState(0);
  const [reservedCount, setReservedCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        const allBooks = Array.isArray(res.data.books) ? res.data.books : Object.values(res.data.books);
        setBooks(allBooks);
        setSearchResults(allBooks);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    // Fetch counts
    const fetchCounts = async () => {
      try {
        const b = await API.get("/books/borrowed");
        const r = await API.get("/books/reserved");
        const o = await API.get("/books/overdue");
        setBorrowedCount(Array.isArray(b.data.books) ? b.data.books.length : 0);
        setReservedCount(Array.isArray(r.data.books) ? r.data.books.length : 0);
        setOverdueCount(Array.isArray(o.data.books) ? o.data.books.length : 0);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchBooks();
    fetchCounts();
  }, []);

  // Handle search
  useEffect(() => {
    const results = books.filter(
      (b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, books]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Library Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white shadow rounded-lg p-4 text-center hover:scale-105 transition">
            <h3 className="text-gray-500 font-medium">Borrowed</h3>
            <p className="text-2xl font-bold text-blue-600">{borrowedCount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center hover:scale-105 transition">
            <h3 className="text-gray-500 font-medium">Reserved</h3>
            <p className="text-2xl font-bold text-purple-600">{reservedCount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center hover:scale-105 transition">
            <h3 className="text-gray-500 font-medium">Overdue</h3>
            <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.length === 0 ? (
            <p className="text-gray-600 col-span-full">No books found.</p>
          ) : (
            searchResults.map((b) => (
              <Link
                key={b._id}
                to={`/books/${b._id}`}
                className="bg-white shadow rounded-lg p-4 hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{b.title}</h3>
                  <p className="text-gray-600">{b.author}</p>
                  <p className="text-gray-500 text-sm">{b.genre}</p>
                </div>
                {b.status && (
                  <span
                    className={`mt-2 px-2 py-1 text-xs font-semibold rounded-full ${
                      b.status === "borrowed"
                        ? "bg-blue-200 text-blue-800"
                        : b.status === "reserved"
                        ? "bg-purple-200 text-purple-800"
                        : b.status === "overdue"
                        ? "bg-red-200 text-red-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {b.status}
                  </span>
                )}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}