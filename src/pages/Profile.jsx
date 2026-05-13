import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const userId = localStorage.getItem("userId");

        const res = await API.get(`/auth/user/${userId}`);

        const data = res.data;

        // 🔥 FORCE NORMALIZATION (IMPORTANT FIX)
        setUser({
          ...data,
          borrowedBooks: data.borrowedBooks || []
        });

      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();

  }, []);

  if (!user) {
    return (
      <div className="p-6 text-xl text-center">
        Loading profile...
      </div>
    );
  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 p-6">

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md text-center border">

        {/* AVATAR */}
        <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto shadow-lg">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        {/* NAME */}
        <h1 className="text-3xl font-bold text-indigo-700 mt-4">
          {user.name}
        </h1>

        {/* EMAIL */}
        <p className="text-gray-600 mt-2">
          📧 {user.email}
        </p>

        {/* BORROW COUNT FIXED */}
        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 shadow">

          <p className="text-lg font-semibold text-indigo-700">
            📚 Borrowed Books: {Array.isArray(user.borrowedBooks) ? user.borrowedBooks.length : 0}
          </p>

        </div>

      </div>

    </div>
  );
}