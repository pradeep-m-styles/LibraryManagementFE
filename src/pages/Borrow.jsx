import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Borrow() {

  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const getConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchBorrowedBooks = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await API.get(
        `/borrow/${userId}`,
        getConfig()
      );

      setBorrowedBooks(res.data || []);

    } catch (err) {
      console.log("Borrow fetch error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const returnBook = async (borrowId) => {
    try {

      await API.put(
        `/borrow/return/${borrowId}`,
        {},
        getConfig()
      );

      fetchBorrowedBooks();

      alert("Book returned successfully");

    } catch (err) {
      console.log(err);
      alert("Return failed");
    }
  };

  return (

    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-100 to-purple-100">

      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
        📚 My Borrowed Books
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {borrowedBooks.length === 0 ? (

          <div className="text-center text-gray-600 col-span-full">
            No borrowed books 😢
          </div>

        ) : (

          borrowedBooks.map(item => (
            <div
              key={item._id}
              className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl"
            >

              <h2 className="text-xl font-bold text-indigo-700">
                {item.bookId?.title}
              </h2>

              <p className="text-gray-600">
                {item.bookId?.author}
              </p>

              <p className="mt-2 text-sm text-gray-700">
                Due: {new Date(item.dueDate).toLocaleDateString()}
              </p>

              <p className="mt-2 text-red-500 font-semibold">
                Fine: ₹{item.fine || 0}
              </p>

              {!item.returnDate && (
                <button
                  onClick={() => returnBook(item._id)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl"
                >
                  Return
                </button>
              )}

            </div>
          ))

        )}

      </div>

    </div>
  );
}