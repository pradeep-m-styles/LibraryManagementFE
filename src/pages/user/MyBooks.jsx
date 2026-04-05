// src/pages/user/MyBooks.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";

export default function MyBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const res = await API.get("/books/borrowed"); // Backend: /api/books/borrowed
        setBooks(res.data.books || []);
      } catch (err) {
        console.error("Error fetching my books:", err);
        setBooks([]);
      }
    };

    fetchMyBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          My Borrowed Books
        </h1>

        {books.length === 0 ? (
          <p className="text-gray-600">No borrowed books.</p>
        ) : (
          <ul className="space-y-3">
            {books.map((b) => (
              <li
                key={b._id}
                className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800 text-lg">{b.title}</p>
                  <p className="text-gray-600">{b.author} - {b.genre}</p>
                </div>
                {b.status && (
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}