import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Reservations() {

  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const getConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // 📚 BOOKS API
  const fetchBooks = async () => {
    try {
      const res = await API.get("/books", getConfig());
      setBooks(res.data || []);
    } catch (err) {
      console.log("Books error:", err.response?.data || err.message);
    }
  };

  // 📌 RESERVATIONS API
  const fetchReservations = async () => {
    try {
      const res = await API.get("/reservations", getConfig());
      setReservations(res.data || []);
    } catch (err) {
      console.log("Reservations error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchBooks();
      await fetchReservations();
      setLoading(false);
    };

    load();
  }, []);

  // 🚀 RESERVE BOOK
  const reserveBook = async (bookId) => {
    try {
      const userId = localStorage.getItem("userId");

      await API.post(
        "/reservations",
        { userId, bookId },
        getConfig()
      );

      await fetchReservations(); // refresh instantly
      alert("✅ Book reserved successfully");

    } catch (err) {
      console.log("Reserve error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "❌ Reservation failed");
    }
  };

  return (

    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100">

      {/* HEADER */}
      <h1 className="text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-orange-500 to-pink-600 text-transparent bg-clip-text">
        📖 Library Reservations
      </h1>

      {/* BOOKS */}
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">
        📚 Available Books
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-2xl p-6 hover:scale-105 transition duration-300"
          >
            <h2 className="text-xl font-bold text-indigo-700">
              📘 {book.title}
            </h2>

            <p className="text-gray-600 mt-2">
              ✍️ {book.author}
            </p>

            <button
              onClick={() => reserveBook(book._id)}
              className="mt-5 w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-600 hover:to-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg"
            >
              Reserve 🚀
            </button>
          </div>
        ))}

      </div>

      {/* RESERVATIONS */}
      <h2 className="text-2xl font-bold mt-14 mb-6 text-purple-700">
        📌 Your Reservations
      </h2>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : reservations.length === 0 ? (
        <div className="text-center text-gray-600">
          No reservations yet 😢
        </div>
      ) : (
        <div className="space-y-4">

          {reservations.map((item) => (
            <div
              key={item._id}
              className="bg-white/80 backdrop-blur-xl border shadow-lg rounded-xl p-5 flex justify-between items-center hover:shadow-2xl transition"
            >
              <div>
                <h3 className="text-lg font-bold text-indigo-700">
                  📘 {item.bookId?.title || "Unknown Book"}
                </h3>

                <p className="text-gray-600">
                  Reserved successfully ✅
                </p>
              </div>

              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                Active
              </span>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}