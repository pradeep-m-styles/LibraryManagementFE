import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [borrowedCount, setBorrowedCount] = useState(0);

  const getConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {

    const fetchData = async () => {
      try {

        const userId = localStorage.getItem("userId");

        const [userRes, borrowRes] = await Promise.all([
          API.get(`/auth/user/${userId}`, getConfig()),
          API.get(`/borrow/${userId}`, getConfig())
        ]);

        setUser(userRes.data || {});
        setBorrowedCount((borrowRes.data || []).length);

      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    fetchData();

  }, []);

  if (!user) {
    return (
      <div className="p-6 text-center text-xl">
        Loading profile...
      </div>
    );
  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 p-6">

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">

        <div className="w-24 h-24 bg-indigo-600 text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <h1 className="text-3xl font-bold text-indigo-700 mt-4">
          {user.name}
        </h1>

        <p className="text-gray-600 mt-2">
          📧 {user.email}
        </p>

        <div className="mt-6 bg-indigo-50 rounded-xl p-4">

          <p className="text-lg font-semibold text-indigo-700">
            📚 Borrowed Books: {borrowedCount}
          </p>

        </div>

      </div>

    </div>
  );
}