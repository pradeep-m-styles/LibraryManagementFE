// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="font-bold text-xl">Library</h1>
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/my-books">My Books</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;