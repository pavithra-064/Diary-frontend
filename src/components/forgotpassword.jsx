import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = ({ setEmail }) => {
  const navigate = useNavigate();
  const [email, setEmailState] = useState("");
  const [message, setMessage] = useState("");

  const getotp = (e) => {
    e.preventDefault();
    axios
      .post("https://diary-backend-vs0o.onrender.com/api/sendotp", { email })
      .then((response) => {
        const { status, data } = response;

        if (status === 200 && data.message === "Mail sent successfully") {
          alert("Mail sent successfully");
          setEmail(email);
          navigate("/resetpassword");
        } else if (
          status === 404 &&
          data.message ===
            "No user found with the given email. Please register."
        ) {
          setMessage("No user found with the given email. Please register.");
        } else {
          setMessage("Unexpected error occurred. Please try again later.");
        }
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (
            status === 404 &&
            data.message ===
              "No user found with the given email. Please register."
          ) {
            setMessage("No user found with the given email. Please register.");
          } else {
            setMessage("Unexpected error occurred. Please try again later.");
          }
        } else {
          setMessage("Unexpected error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-[80%] md:w-full max-w-md">
        <h3 className="text-2xl font-bold mb-4">Password Reset</h3>
        <p className="text-gray-600 mb-4">
          Enter the email address to reset your password.
        </p>
        <form onSubmit={getotp}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmailState(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>
          {message && (
            <p className="text-red-500 text-xs italic mb-4">{message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#0c072cfd] hover:bg-[#231d4cfd] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
