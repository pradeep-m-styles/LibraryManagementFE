import { Link } from "react-router-dom";

export default function Navbar() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (

    <nav className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg px-6 py-4">

      <div className="flex items-center">

        {/* LEFT SIDE */}
        <h1 className="text-2xl font-bold">
          📚 Library Management System
        </h1>

        {/* RIGHT SIDE */}
        <div className="ml-auto flex flex-wrap items-center gap-4 text-sm font-medium">

          <Link
            to="/dashboard"
            className="hover:text-yellow-300 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/books"
            className="hover:text-yellow-300 transition"
          >
            Books
          </Link>

          <Link
            to="/add-book"
            className="hover:text-yellow-300 transition"
          >
            Add Book
          </Link>

          <Link
            to="/borrow"
            className="hover:text-yellow-300 transition"
          >
            Borrow
          </Link>

          <Link
            to="/reservations"
            className="hover:text-yellow-300 transition"
          >
            Reservations
          </Link>

          <Link
            to="/reviews"
            className="hover:text-yellow-300 transition"
          >
            Reviews
          </Link>

          <Link
            to="/profile"
            className="hover:text-yellow-300 transition"
          >
            Profile
          </Link>

          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition"
          >
            Register
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}