import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = ({ email }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  });
  const changePass = () => {
    if (!email || !password || !confirmPassword || !otp) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    const data = {
      email: email,
      otp: otp,
      password: password,
    };

    axios
      .post("https://diary-backend-vs0o.onrender.com/api/setpassword", data)
      .then((response) => {
        const { status, data } = response;
        if (
          status === 200 &&
          data.message === "New password saved Successfully"
        ) {
          alert("New password saved Successfully");
          navigate("/");
        } else if (
          status === 400 &&
          data.message === "The OTP you have entered is wrong"
        ) {
          setErrorMessage("The OTP you have entered is wrong.");
        } else {
          setErrorMessage("Unexpected error occurred. Please try again later.");
        }
      })
      .catch((error) => {
        setErrorMessage("Unexpected error occurred. Please try again later.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] bg-[#dedfe0] m-4 mt-10  md:m-0 p-8 shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-full  mt-4 md:mt-0">
            <h3 className="text-2xl font-bold mb-4">Password Reset</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                value={email}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                OTP
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="bg-[#0c072cfd] w-full  hover:bg-[#231d4cfd] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={changePass}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
