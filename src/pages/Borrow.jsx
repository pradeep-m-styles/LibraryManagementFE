import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Borrow() {

  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const fetchBorrowedBooks = async () => {

    try {

      const userId = localStorage.getItem("userId");

      const res = await API.get(`/borrow/${userId}`);

      setBorrowedBooks(res.data);

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

    <div className="min-h-screen p-6 bg-gradient-to-r from-indigo-50 to-blue-100">

      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        📚 Borrowed Books
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {borrowedBooks.length === 0 ? (

          <div className="text-xl text-gray-600">
            No borrowed books
          </div>

        ) : (

          borrowedBooks.map(item => (

            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-xl p-6"
            >

              <h2 className="text-2xl font-bold text-indigo-700">
                {item.bookId?.title}
              </h2>

              <p className="text-gray-600 mt-2">
                ✍️ {item.bookId?.author}
              </p>

              <p className="mt-3">
                <span className="font-semibold">Due:</span>{" "}
                {new Date(item.dueDate).toLocaleDateString()}
              </p>

              <p className="mt-2 text-red-500 font-semibold">
                Fine: ₹{item.fine || 0}
              </p>

              {!item.returnDate && (

                <button
                  onClick={() => returnBook(item._id)}
                  className="w-full mt-5 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
                >
                  Return Book
                </button>

              )}

            </div>

          ))
        )}

      </div>

    </div>
  );
}