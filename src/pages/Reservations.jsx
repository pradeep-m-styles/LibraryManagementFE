import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Reservations() {

  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);

  const getConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // 📚 BOOKS
  const fetchBooks = async () => {
    try {
      const res = await API.get("/books", getConfig());
      setBooks(res.data || []);
    } catch (err) {
      console.log("Books error:", err.response?.data || err.message);
    }
  };

  // 📌 RESERVATIONS
  const fetchReservations = async () => {
    try {
      const res = await API.get("/reservations", getConfig());
      setReservations(res.data || []);
    } catch (err) {
      console.log("Reservations error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchReservations();
  }, []);

  // 🚀 FIXED RESERVE FUNCTION
  const reserveBook = async (bookId) => {
    try {

      const token = localStorage.getItem("token");

      // 🔥 IMPORTANT FIX: most backends expect ONLY bookId
      const res = await API.post(
        "/reservations",
        { book: bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Reservation success:", res.data);

      fetchReservations();

      alert("✅ Book reserved successfully");

    } catch (err) {
      console.log("RESERVATION ERROR:", err.response?.data || err.message);

      alert(err.response?.data?.message || "Reservation failed");
    }
  };

  return (

    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-100 to-purple-100">

      <h1 className="text-4xl font-bold text-center mb-8 text-purple-700">
        📖 Reservations
      </h1>

      {/* BOOKS */}
      <div className="grid md:grid-cols-3 gap-6">

        {books.map(book => (

          <div
            key={book._id}
            className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl hover:scale-105 transition"
          >

            <h2 className="text-xl font-bold text-indigo-700">
              📘 {book.title}
            </h2>

            <p className="text-gray-600">
              ✍️ {book.author}
            </p>

            <button
              onClick={() => reserveBook(book._id)}
              className="mt-4 w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 text-white py-2 rounded-xl font-semibold"
            >
              Reserve 🚀
            </button>

          </div>

        ))}

      </div>

      {/* RESERVATIONS */}
      <div className="mt-10">

        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Your Reservations
        </h2>

        {reservations.length === 0 ? (
          <p className="text-gray-600">No reservations 😢</p>
        ) : (
          reservations.map(r => (
            <div
              key={r._id}
              className="bg-white/80 backdrop-blur-xl p-4 rounded-xl shadow mb-3"
            >
              📘 {r.book?.title}
            </div>
          ))
        )}

      </div>

    </div>
  );
}