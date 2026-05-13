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
      <div className="p-6 text-xl">
        Loading profile...
      </div>
    );
  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-200 p-6">

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">

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

          <p className="text-lg">
            📚 Borrowed Books: {user.borrowedBooks?.length || 0}
          </p>

        </div>

      </div>

    </div>
  );
}