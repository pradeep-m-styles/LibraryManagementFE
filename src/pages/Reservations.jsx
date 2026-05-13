import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Reservations() {

  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);

  // FETCH BOOKS
  const fetchBooks = async () => {

    try {

      const res = await API.get("/books");

      setBooks(res.data);

    } catch (err) {

      console.log(err);

      alert("❌ Failed to load books");

    }
  };

  // FETCH RESERVATIONS
  const fetchReservations = async () => {

    try {

      const res = await API.get("/reservations");

      setReservations(res.data);

    } catch (err) {

      console.log(err);

      alert("❌ Failed to load reservations");

    }
  };

  useEffect(() => {

    fetchBooks();
    fetchReservations();

  }, []);

  // RESERVE BOOK
  const reserveBook = async (bookId) => {

    try {

      const userId = localStorage.getItem("userId");

      await API.post("/reservations", {
        userId,
        bookId
      });

      alert("✅ Book reserved successfully");

      fetchReservations();

    } catch (err) {

      console.log(err);

      alert("❌ Reservation failed");

    }
  };

  return (

    <div className="min-h-screen p-6 bg-gradient-to-r from-yellow-50 to-orange-100">

      <h1 className="text-4xl font-bold text-orange-700 mb-8">
        📖 Reservations
      </h1>

      {/* BOOKS */}
      <div>

        <h2 className="text-2xl font-bold mb-4 text-indigo-700">
          Available Books
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {books.map(book => (

            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-xl p-6"
            >

              <h2 className="text-2xl font-bold text-indigo-700">
                {book.title}
              </h2>

              <p className="text-gray-600 mt-2">
                ✍️ {book.author}
              </p>

              <button
                onClick={() => reserveBook(book._id)}
                className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl"
              >
                Reserve Book
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* RESERVED BOOKS */}
      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-4 text-purple-700">
          Reserved Books
        </h2>

        <div className="space-y-4">

          {reservations.length === 0 ? (

            <div className="text-gray-600 text-lg">
              No reservations yet
            </div>

          ) : (

            reservations.map(item => (

              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg p-4"
              >

                <h2 className="text-xl font-bold text-indigo-700">
                  {item.bookId?.title}
                </h2>

                <p className="text-gray-600">
                  Reserved Successfully ✅
                </p>

              </div>

            ))
          )}

        </div>

      </div>

    </div>
  );
}