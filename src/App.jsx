import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Borrow from "./pages/Borrow";
import Reservations from "./pages/Reservations";
import Reviews from "./pages/Reviews";
import Profile from "./pages/Profile";
import AddBook from "./pages/AddBook";

export default function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-book" element={<AddBook />} />
      </Routes>

    </BrowserRouter>
  );
}