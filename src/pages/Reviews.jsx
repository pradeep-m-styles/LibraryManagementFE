import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Reviews() {

  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [bookId, setBookId] = useState("");
  const [books, setBooks] = useState([]);

  // GET BOOKS FROM REAL API
  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data || []);
    } catch (err) {
      console.log("Books error:", err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ADD REVIEW (frontend only for now)
  const addReview = () => {
    if (!text || !bookId) return;

    const selectedBook = books.find(b => b._id === bookId);

    const newReview = {
      bookTitle: selectedBook?.title,
      text,
      date: new Date().toLocaleString()
    };

    setReviews([newReview, ...reviews]);

    setText("");
    setBookId("");
  };

  return (

    <div className="min-h-screen p-8 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">

      {/* HEADER */}
      <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-10">
        ⭐ Book Reviews
      </h1>

      {/* FORM */}
      <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl p-6 border">

        <h2 className="text-xl font-bold text-purple-700 mb-4">
          Write Review ✍️
        </h2>

        {/* REAL BOOK SELECT */}
        <select
          className="w-full p-3 border rounded-xl mb-4 focus:ring-2 focus:ring-purple-400"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        >
          <option value="">Select Book</option>

          {books.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))}
        </select>

        {/* REVIEW TEXT */}
        <textarea
          placeholder="Write your review..."
          className="w-full border p-4 rounded-xl focus:ring-2 focus:ring-purple-400"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={addReview}
          className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg"
        >
          Add Review 🚀
        </button>

      </div>

      {/* REVIEWS LIST */}
      <div className="max-w-3xl mx-auto mt-10 space-y-5">

        {reviews.length === 0 ? (
          <div className="text-center text-gray-600">
            No reviews yet 😢
          </div>
        ) : (
          reviews.map((r, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-xl border shadow-xl rounded-xl p-5 hover:scale-[1.02] transition"
            >

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-indigo-700">
                  📘 {r.bookTitle}
                </h3>

                <span className="text-xs text-gray-500">
                  {r.date}
                </span>
              </div>

              <p className="mt-3 text-gray-700">
                ⭐ {r.text}
              </p>

            </div>
          ))
        )}

      </div>

    </div>
  );
}