// src/pages/SendEmail.js
import React, { useState } from "react";
import axios from "axios";

const SendEmail = () => {
  const [status, setStatus] = useState("");

  const sendEmail = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/send-email`,
        {
          to: "friendemail@gmail.com", // different from your verified sender
          subject: "Test LMS Email",
          text: "Hello from frontend trigger"
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
    <div className="p-6">
      <button
        onClick={sendEmail}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Send Test Email
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
};

export default SendEmail;