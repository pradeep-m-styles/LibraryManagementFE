// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/user/Home";
import Books from "./pages/user/Books";
import BookDetails from "./pages/user/BookDetails";
import Profile from "./pages/user/Profile";
import MyBooks from "./pages/user/MyBooks";
import Reservations from "./pages/user/Reservations";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/admin/Dashboard";
import AddBook from "./pages/admin/AddBook";
import ManageBooks from "./pages/admin/ManageBooks";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<BookDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Routes */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/my-books" element={<ProtectedRoute><MyBooks /></ProtectedRoute>} />
        <Route path="/reservations" element={<ProtectedRoute><Reservations /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/add-book" element={<AdminRoute><AddBook /></AdminRoute>} />
        <Route path="/admin/books" element={<AdminRoute><ManageBooks /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}