import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);

  const fetch = () => {
    API.get("/books").then((res) => setBooks(res.data));
  };

  const deleteBook = async (id) => {
    await API.delete(`/books/${id}`);
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Books</h1>

      {books.map((b) => (
        <div key={b._id} className="card flex justify-between mb-2">
          <p>{b.title}</p>
          <button
            onClick={() => deleteBook(b._id)}
            className="btn bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}