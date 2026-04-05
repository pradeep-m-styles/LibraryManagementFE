import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Reservations() {
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get("/reservations").then((res) => setList(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">My Reservations</h1>

      {list.map((r) => (
        <div key={r._id} className="card mt-2">
          <p>{r.book.title}</p>
          <p>Status: {r.status}</p>
        </div>
      ))}
    </div>
  );
}