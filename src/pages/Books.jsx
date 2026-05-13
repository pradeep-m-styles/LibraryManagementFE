import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Books() {

  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 🔥 FIXED BORROW FUNCTION
  const borrowBook = async (bookId) => {
    try {

      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      await API.post(
        "/borrow",
        { userId, bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🔥 instant UI update
      setBooks(prev =>
        prev.map(book =>
          book._id === bookId
            ? { ...book, status: "borrowed" }
            : book
        )
      );

      alert("✅ Book borrowed successfully");

    } catch (err) {
      console.log("Borrow error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Borrow failed");
    }
  };

  return (

    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">

      <h1 className="text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
        📚 Library Books
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {books.map(book => (

          <div
            key={book._id}
            className="bg-white/80 backdrop-blur-xl border shadow-xl rounded-2xl p-6 hover:scale-105 transition"
          >

            <h2 className="text-xl font-bold text-indigo-700">
              📘 {book.title}
            </h2>

            <p className="text-gray-600 mt-1">
              ✍️ {book.author}
            </p>

            <div className="mt-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  book.status === "borrowed"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {book.status === "borrowed" ? "Borrowed" : "Available"}
              </span>
            </div>

            <button
              disabled={book.status === "borrowed"}
              onClick={() => borrowBook(book._id)}
              className={`w-full mt-5 py-3 rounded-xl font-semibold shadow-lg transition ${
                book.status === "borrowed"
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-600 text-white"
              }`}
            >
              {book.status === "borrowed" ? "Already Borrowed" : "Borrow Book 🚀"}
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}