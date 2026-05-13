import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Borrow() {

  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const fetchBorrowedBooks = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await API.get(`/borrow/${userId}`);

      setBorrowedBooks(res.data || []);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const returnBook = async (borrowId) => {
    try {
      await API.put(`/borrow/return/${borrowId}`);

      alert("Book returned successfully");

      fetchBorrowedBooks();

    } catch (err) {
      console.log(err);
      alert("Return failed");
    }
  };

  return (

    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100">

      {/* HEADER */}
      <h1 className="text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
        📚 My Borrowed Books
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {borrowedBooks.length === 0 ? (

          <div className="text-center text-gray-600 text-xl col-span-full">
            No borrowed books 😢
          </div>

        ) : (

          borrowedBooks.map(item => (

            <div
              key={item._id}
              className="bg-white/80 backdrop-blur-xl border shadow-xl rounded-2xl p-6 hover:scale-105 transition duration-300"
            >

              {/* BOOK TITLE */}
              <h2 className="text-xl font-bold text-indigo-700">
                📘 {item.bookId?.title}
              </h2>

              <p className="text-gray-600 mt-1">
                ✍️ {item.bookId?.author}
              </p>

              {/* STATUS BADGE */}
              <div className="mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.returnDate
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.returnDate ? "Available" : "Borrowed"}
                </span>
              </div>

              {/* DUE DATE */}
              <p className="mt-3 text-gray-700">
                📅 Due:{" "}
                <span className="font-semibold">
                  {new Date(item.dueDate).toLocaleDateString()}
                </span>
              </p>

              {/* FINE */}
              <p className="mt-2 text-red-500 font-semibold">
                💰 Fine: ₹{item.fine || 0}
              </p>

              {/* RETURN BUTTON */}
              {!item.returnDate && (
                <button
                  onClick={() => returnBook(item._id)}
                  className="w-full mt-5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white py-3 rounded-xl font-semibold shadow-lg"
                >
                  Return Book 🔄
                </button>
              )}

            </div>

          ))

        )}

      </div>

    </div>
  );
}