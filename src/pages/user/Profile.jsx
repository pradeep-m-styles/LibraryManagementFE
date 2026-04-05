// src/pages/user/Profile.jsx
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [emailStatus, setEmailStatus] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Use Vite env variable for backend
  const API_URL = import.meta.env.VITE_API_URL || "https://librarymanagementbe-th64.onrender.com/";

  // Dummy borrowed books (for display)
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const dummyBooks = [
          { title: "The Great Gatsby", dueDate: "2026-04-10" },
          { title: "1984", dueDate: "2026-04-15" },
          { title: "To Kill a Mockingbird", dueDate: "2026-04-20" },
        ];
        setBorrowedBooks(dummyBooks);
      } catch (err) {
        console.log("Error fetching books:", err);
      }
    };
    fetchBorrowedBooks();
  }, []);

  // Send Test Email
  const sendTestEmail = async () => {
    try {
      const res = await fetch(`${API_URL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "pradeepsiva971@gmail.com",
          subject: "Test LMS Email",
          text: "Hello from frontend trigger",
        }),
      });

      if (res.ok) {
        setEmailStatus("Email sent ✅");
      } else {
        setEmailStatus("Failed ❌");
      }
    } catch (err) {
      console.error(err);
      setEmailStatus("Failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Profile</h2>
          <p className="text-gray-700">
            <span className="font-semibold">Name:</span> {user?.name || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {user?.email || "N/A"}
          </p>
        </div>

        {/* Email Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={sendTestEmail}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition transform duration-300"
          >
            Send Test Email
          </button>
          {emailStatus && (
            <span
              className={`font-semibold ${
                emailStatus.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {emailStatus}
            </span>
          )}
        </div>

        {/* Borrowed Books */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500 hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-bold text-green-600 mb-4">
            Borrowed Books
          </h2>
          {borrowedBooks.length === 0 ? (
            <p className="text-gray-600">No borrowed books.</p>
          ) : (
            <ul className="space-y-3">
              {borrowedBooks.map((book, index) => (
                <li
                  key={index}
                  className="bg-gradient-to-r from-green-100 to-green-200 p-3 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex justify-between items-center"
                >
                  <span className="font-medium text-gray-800">{book.title}</span>
                  <span className="text-sm text-gray-600">Due: {book.dueDate}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;