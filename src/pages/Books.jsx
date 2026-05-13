import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data);
      } catch (err) {
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const borrow = async (bookId) => {
    try {
      const userId = localStorage.getItem("userId");

      await API.post("/borrow", { userId, bookId });

      alert("Book borrowed successfully");

      // refresh
      const res = await API.get("/books");
      setBooks(res.data);

    } catch (err) {
      alert(err.response?.data?.message || "Borrow failed");
    }
  };

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading books...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">

      <input
        className="border p-2 w-full mb-4"
        placeholder="Search books..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {filteredBooks.map(book => (
          <div key={book._id} className="border p-4 rounded shadow">

            <h2 className="font-bold">{book.title}</h2>
            <p className="text-gray-600">{book.author}</p>

            <p className="mt-2">
              Status:{" "}
              <span className={book.available ? "text-green-600" : "text-red-600"}>
                {book.available ? "Available" : "Borrowed"}
              </span>
            </p>

            <button
              disabled={!book.available}
              onClick={() => borrow(book._id)}
              className={`px-3 py-1 mt-2 text-white rounded ${
                book.available ? "bg-blue-500" : "bg-gray-400"
              }`}
            >
              {book.available ? "Borrow" : "Borrowed"}
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}