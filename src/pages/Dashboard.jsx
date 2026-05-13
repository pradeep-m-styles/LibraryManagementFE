import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {

  const [data, setData] = useState({});

  useEffect(() => {

    API.get("/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.log(err));

  }, []);

  return (

    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-50 to-indigo-100">

      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        📊 Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow-xl rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-600">
            {data.totalBooks || 0}
          </h2>
          <p className="text-gray-600 mt-2">Books</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-bold text-green-600">
            {data.totalUsers || 0}
          </h2>
          <p className="text-gray-600 mt-2">Users</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-bold text-purple-600">
            {data.totalBorrows || 0}
          </h2>
          <p className="text-gray-600 mt-2">Borrows</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600">
            {data.overdueBooks || 0}
          </h2>
          <p className="text-gray-600 mt-2">Overdue</p>
        </div>

      </div>

    </div>
  );
}