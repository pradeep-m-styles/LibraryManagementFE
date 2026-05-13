import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Books() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  // FETCH BOOKS
  const fetchBooks = async () => {

    try {

      const res = await API.get("/books");

      setBooks(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // BORROW BOOK
  const borrow = async (bookId) => {

    try {

      const userId = localStorage.getItem("userId");

      await API.post("/borrow", {
        userId,
        bookId
      });

      // UPDATE UI IMMEDIATELY
      const updatedBooks = books.map(book => {

        if (book._id === bookId) {

          return {
            ...book,
            available: false
          };
        }

        return book;
      });

      setBooks(updatedBooks);

      alert("Book borrowed successfully");

    } catch (err) {

      console.log(err);

      alert("Borrow failed");

    }
  };

  // SEARCH FILTER
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">

          <h1 className="text-3xl font-bold text-indigo-700 mb-4">
            📚 Books Collection
          </h1>

          <input
            type="text"
            placeholder="Search books..."
            className="w-full border-2 border-indigo-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* BOOK GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredBooks.length === 0 ? (

            <div className="text-center text-xl text-gray-600 col-span-full">
              No books found
            </div>

          ) : (

            filteredBooks.map(book => (

              <div
                key={book._id}
                className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition duration-300"
              >

                <h2 className="text-2xl font-bold text-indigo-700">
                  {book.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  ✍️ {book.author}
                </p>

                <p className="mt-2">
                  <span className="font-semibold">ISBN:</span> {book.isbn}
                </p>

                <p className="mt-1">
                  <span className="font-semibold">Genre:</span> {book.genre}
                </p>

                <p className="mt-1">
                  <span className="font-semibold">Year:</span> {book.publicationYear}
                </p>

                {/* STATUS */}
                <div className="mt-4">

                  {book.available ? (

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Status: Available
                    </span>

                  ) : (

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Status: Borrowed
                    </span>

                  )}

                </div>

                {/* BUTTON */}
                <button
                  disabled={!book.available}
                  onClick={() => borrow(book._id)}
                  className={`w-full mt-5 py-3 rounded-xl text-white font-semibold transition ${
                    book.available
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >

                  {book.available
                    ? "Borrow Book"
                    : "Already Borrowed"}

                </button>

              </div>

            ))
          )}

        </div>

      </div>

    </div>
  );
}