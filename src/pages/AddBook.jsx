import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddBook() {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("Available");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/books", {
        title,
        author,
        isbn,
        genre,
        publicationYear,
        availabilityStatus
      });

      alert("Book added successfully");

      navigate("/books");

    } catch (err) {

      console.log(err.response?.data || err.message);

      alert(
        err.response?.data?.message || "Failed to add book"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Add New Book
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* TITLE */}
          <input
            type="text"
            placeholder="Book Title"
            className="border p-3 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* AUTHOR */}
          <input
            type="text"
            placeholder="Author"
            className="border p-3 rounded-lg"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          {/* ISBN */}
          <input
            type="text"
            placeholder="ISBN"
            className="border p-3 rounded-lg"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />

          {/* GENRE */}
          <input
            type="text"
            placeholder="Genre"
            className="border p-3 rounded-lg"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />

          {/* PUBLICATION YEAR */}
          <input
            type="number"
            placeholder="Publication Year"
            className="border p-3 rounded-lg"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            required
          />

          {/* AVAILABILITY STATUS */}
          <select
            className="border p-3 rounded-lg"
            value={availabilityStatus}
            onChange={(e) => setAvailabilityStatus(e.target.value)}
          >
            <option value="Available">Available</option>
            <option value="Borrowed">Borrowed</option>
            <option value="Reserved">Reserved</option>
          </select>

          {/* BUTTON */}
          <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold">
            Add Book
          </button>

        </form>

      </div>

    </div>
  );
}