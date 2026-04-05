// src/pages/SendEmail.jsx
import React, { useState } from "react";
import axios from "axios";

export default function SendEmail() {
  const [status, setStatus] = useState("");

  const sendEmail = async () => {
    try {
      const res = await axios.post(
        `${process.env.VITE_API_URL}/api/send-email`,
        {
          to: "pradeepsiva971@gmail.com", // replace with actual email
          subject: "Test LMS Email",
          text: "Hello from frontend trigger",
        }
      );

      if (res.data.success) {
        setStatus("Email API triggered successfully ✅");
      } else {
        setStatus("Email API failed ❌");
      }
    } catch (err) {
      setStatus("Error sending email ❌");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center space-y-4 w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-700">Send Test Email</h2>

        <button
          onClick={sendEmail}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition transform duration-300"
        >
          Trigger Email
        </button>

        {status && (
          <p
            className={`font-semibold ${
              status.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}