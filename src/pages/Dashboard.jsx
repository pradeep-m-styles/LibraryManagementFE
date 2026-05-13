import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [books, setBooks] = useState(0);
  const [users, setUsers] = useState(0);
  const [borrows, setBorrows] = useState(0);
  const [overdue, setOverdue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // 🔥 BOOKS
        const booksRes = await API.get("/books", config);
        setBooks(booksRes.data.length || 0);

        // 🔥 USERS
        const usersRes = await API.get("/users", config);
        setUsers(usersRes.data.length || 0);

        // 🔥 BORROWS
        const borrowsRes = await API.get("/borrows", config);
        setBorrows(borrowsRes.data.length || 0);

        // 🔥 OVERDUE
        const overdueRes = await API.get("/borrows/overdue", config);
        setOverdue(overdueRes.data.length || 0);

      } catch (err) {
        console.log("Dashboard error:", err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 grid grid-cols-2 gap-6">

      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-bold">Books</h2>
        <p className="text-3xl">{books}</p>
      </div>

      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-bold">Users</h2>
        <p className="text-3xl">{users}</p>
      </div>

      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-bold">Borrows</h2>
        <p className="text-3xl">{borrows}</p>
      </div>

      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-bold">Overdue</h2>
        <p className="text-3xl">{overdue}</p>
      </div>

    </div>
  );
}