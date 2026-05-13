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

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books", getConfig());
      setBooks(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await API.get("/reservations", getConfig());
      setReservations(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchReservations();
  }, []);

  const reserveBook = async (bookId) => {
    try {

      const userId = localStorage.getItem("userId");

      await API.post(
        "/reservations",
        { userId, bookId },
        getConfig()
      );

      fetchReservations();

      alert("Book reserved successfully");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Reservation failed");
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
            className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl"
          >

            <h2 className="text-xl font-bold text-indigo-700">
              {book.title}
            </h2>

            <p className="text-gray-600">
              {book.author}
            </p>

            <button
              onClick={() => reserveBook(book._id)}
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl"
            >
              Reserve
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
            <div key={r._id} className="bg-white p-4 rounded-xl shadow mb-3">
              📘 {r.bookId?.title}
            </div>
          ))
        )}

      </div>

    </div>
  );
}