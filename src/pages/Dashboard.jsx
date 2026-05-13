import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
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

      const [booksRes, usersRes, borrowsRes, overdueRes] =
        await Promise.all([
          API.get("/books", getConfig()),
          API.get("/auth/users", getConfig()),      // adjust if your route differs
          API.get("/borrow", getConfig()),          // ALL borrows
          API.get("/borrow/overdue", getConfig())   // overdue list
        ]);

      setBooks(booksRes.data || []);
      setUsers(usersRes.data || []);
      setBorrows(borrowsRes.data || []);
      setOverdue(overdueRes.data || []);

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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-indigo-600">{books.length}</h2>
          <p>Books</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-green-600">{users.length}</h2>
          <p>Users</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-orange-600">{borrows.length}</h2>
          <p>Borrows</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-600">{overdue.length}</h2>
          <p>Overdue</p>
        </div>

      </div>

    </div>
  );
}