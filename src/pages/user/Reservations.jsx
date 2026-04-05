// src/pages/user/Reservations.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Reservations() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await API.get("/reservations");
        // Ensure it's an array
        setList(res.data.reservations || []);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setList([]);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">My Reservations</h1>

      {list.length === 0 ? (
        <p className="text-gray-600 mt-2">No reservations found.</p>
      ) : (
        list.map((r) => (
          <div key={r._id} className="card mt-2 p-3 bg-white shadow rounded">
            <p className="font-semibold">{r.book.title}</p>
            <p>Status: {r.status}</p>
          </div>
        ))
      )}
    </div>
  );
}