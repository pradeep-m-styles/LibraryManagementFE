import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [borrowCount, setBorrowCount] = useState(0);

  useEffect(() => {

    const fetchUser = async () => {
      try {

        const userId = localStorage.getItem("userId");

        const [userRes, borrowRes] = await Promise.all([
          API.get(`/auth/user/${userId}`),
          API.get(`/borrow`)
        ]);

        setUser(userRes.data);

        const userBorrows = (borrowRes.data || []).filter(
          b => b.user === userId || b.user?._id === userId
        );

        setBorrowCount(userBorrows.length);

      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    fetchUser();

  }, []);

  if (!user) return <div>Loading...</div>;

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-indigo-200">

      <div className="bg-white p-8 rounded-3xl shadow-xl text-center">

        <h1 className="text-3xl font-bold text-indigo-700">
          {user.name}
        </h1>

        <p className="text-gray-600">{user.email}</p>

        <div className="mt-5 bg-indigo-50 p-4 rounded-xl">
          📚 Borrowed Books: {borrowCount}
        </div>

      </div>

    </div>
  );
}