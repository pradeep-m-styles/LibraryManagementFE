import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const userId = localStorage.getItem("userId");

        const res = await API.get(`/auth/user/${userId}`);

        setUser(res.data);

      } catch (err) {
        console.log(err);
      }

    };

    fetchUser();

  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading profile...
      </div>
    );
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-6">

      {/* 🔥 MEDIUM CARD */}
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center">

        {/* Avatar */}
        <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold text-indigo-700 mt-4">
          {user.name}
        </h1>

        {/* Email */}
        <p className="text-gray-600 mt-1">
          📧 {user.email}
        </p>

        {/* Borrow Count */}
        <div className="mt-6 bg-indigo-50 rounded-xl p-4 shadow-sm">
          <p className="text-gray-500">📚 Borrowed Books</p>
          <h2 className="text-2xl font-bold text-indigo-700 mt-1">
            {user.borrowedBooks?.length || 0}
          </h2>
        </div>

      </div>

    </div>
  );
}