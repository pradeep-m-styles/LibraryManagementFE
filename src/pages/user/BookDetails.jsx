import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null); // start with null

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await API.get(`/books/${id}`);
        setBook(res.data.book || null);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setBook(null);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-gray-600 text-lg">Book details not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 p-6 flex justify-center">
      <div className="card max-w-xl w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h1 className="text-3xl font-bold text-purple-700">{book.title}</h1>
        <p className="text-gray-700 font-medium">Author: {book.author}</p>
        <p className="text-gray-700 font-medium">Genre: {book.genre}</p>

        {book.status && (
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${
              book.status === "borrowed"
                ? "bg-blue-200 text-blue-800"
                : book.status === "reserved"
                ? "bg-purple-200 text-purple-800"
                : book.status === "overdue"
                ? "bg-red-200 text-red-800"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {book.status}
          </span>
        )}

        <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow transition duration-300">
          Borrow
        </button>
      </div>
    </div>
  );
}