import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState(1); // current user only
  const [borrows, setBorrows] = useState([]);
  const [overdue, setOverdue] = useState([]);

  const getConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchData = async () => {
    try {

      const userId = localStorage.getItem("userId");

      // ✅ FIXED ROUTES (NO /auth/users, NO /borrow/:id)

      const booksRes = await API.get("/books", getConfig());

      const userRes = await API.get(`/auth/user/${userId}`, getConfig());

      const borrowsRes = await API.get("/borrow", getConfig());

      const overdueRes = await API.get("/borrow/overdue", getConfig());

      setBooks(booksRes.data || []);

      // single user profile (not /users list)
      setUsers(userRes.data ? 1 : 0);

      setBorrows(Array.isArray(borrowsRes.data) ? borrowsRes.data : []);

      setOverdue(Array.isArray(overdueRes.data) ? overdueRes.data : []);

    } catch (err) {
      console.log("Dashboard error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (

    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">

      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">
        📊 Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-3xl font-bold text-indigo-600">
            {books.length}
          </h2>
          <p>Books</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-3xl font-bold text-green-600">
            {users}
          </h2>
          <p>User</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-3xl font-bold text-orange-600">
            {borrows.length}
          </h2>
          <p>Borrows</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-3xl font-bold text-red-600">
            {overdue.length}
          </h2>
          <p>Overdue</p>
        </div>

      </div>

    </div>
  );
}