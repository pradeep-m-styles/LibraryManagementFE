import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Books() {
  const [books, setBooks] = useState([]); // all books
  const [searchResults, setSearchResults] = useState([]); // filtered books
  const [query, setQuery] = useState("");

  // Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        const booksArray = Array.isArray(res.data.books) ? res.data.books : [];
        setBooks(booksArray);
        setSearchResults(booksArray);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setQuery(q);
    const filtered = books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
    );
    setSearchResults(filtered);
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-yellow-700">Books</h1>

        <input
          type="text"
          placeholder="Search books by title or author..."
          value={query}
          onChange={handleSearch}
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
        />

        {searchResults.length === 0 ? (
          <p className="text-gray-600">No books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((b) => (
              <div
                key={b._id}
                className="bg-yellow-100 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <p className="font-semibold text-gray-800 text-lg">{b.title}</p>
                <p className="text-gray-600">{b.author} - {b.genre}</p>
                {b.status && (
                  <span
                    className={`px-2 py-1 mt-2 inline-block text-xs font-semibold rounded-full ${
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}