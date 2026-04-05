import { useEffect, useState } from "react";
import API from "../../services/api"; // ✅ correct path from user folder

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books"); // fetch all books
        setBooks(res.data.books || []);
      } catch (err) {
        console.error("Error fetching books:", err);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-yellow-700 mb-4">Books</h1>

        {books.length === 0 ? (
          <p className="text-gray-600">No books found.</p>
        ) : (
          <ul className="space-y-3">
            {books.map((b) => (
              <li
                key={b._id}
                className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800 text-lg">{b.title}</p>
                  <p className="text-gray-600">{b.author} - {b.genre}</p>
                </div>
                {b.status && (
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      b.status === "borrowed"
                        ? "bg-blue-200 text-blue-800"
                        : b.status === "reserved"
                        ? "bg-purple-200 text-purple-800"
                        : b.status === "overdue"
                        ? "bg-red-200 text-red-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {b.status}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}