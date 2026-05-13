import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", formData);

      alert("Registration successful");

      navigate("/");

    } catch (err) {

      console.log(err);

      alert("Registration failed");

    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-200">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          📝 Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl">
            Register
          </button>

        </form>

      </div>

    </div>
  );
}