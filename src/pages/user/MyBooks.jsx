import { useEffect, useState } from "react";
import API from "../../services/api";

export default function MyBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const res = await API.get("/books/borrowed");
        const booksArray = Array.isArray(res.data.books) ? res.data.books : Object.values(res.data.books || []);
        setBooks(booksArray);
      } catch (err) {
        console.error("Error fetching my books:", err);
      }
    };

    fetchMyBooks();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 mb-4">My Borrowed Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.length === 0 ? (
          <p className="text-gray-600 col-span-full">No borrowed books.</p>
        ) : (
          books.map((b) => (
            <div key={b._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between">
              <h3 className="font-bold text-lg">{b.title}</h3>
              <p className="text-gray-600">{b.author} - {b.genre}</p>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full mt-2 ${
                  b.status === "borrowed"
                    ? "bg-blue-200 text-blue-800"
                    : b.status === "reserved"
                    ? "bg-purple-200 text-purple-800"
                    : b.status === "overdue"
                    ? "bg-red-200 text-red-800"
                    : "bg-gray-200 text-gray-800"
                }`}>{b.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}