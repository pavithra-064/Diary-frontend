import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitReg = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setMessage("Enter All Details");
    } else {
      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!email || regex.test(email) === false) {
        setMessage("Enter valid email ID");
      } else if (password !== confirmPassword) {
        setMessage("Passwords didn't match");
      } else {
        const userData = {
          name: name,
          email: email,
          password: password,
        };

        axios
          .post(
            "https://diary-backend-vs0o.onrender.com/api/register",
            userData
          )
          .then(function (response) {
            const { status, data } = response;
            if (status === 201) {
              alert("User Created Successfully. Please Login");
              navigate("/");
            } else {
              setMessage("User Already exists! Pleas Login");
            }
          })
          .catch(function (error) {
            console.error("Registration error:", error);
            setMessage("Registration failed. Please try again later.");
          });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-[80%] md:w-[35%] my-10 md:mt-0 p-2 md:p-5 bg-[#dedfe0] rounded-lg shadow-lg flex flex-col lg:flex-row">
        <div className="w-full p-5">
          <h3 className="text-2xl font-bold mb-5">Register</h3>
          <form className="space-y-4">
            <div>
              <label
                className="block text-gray-800 text-md font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-gray-800 text-md font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="Enter Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-gray-800 text-md font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                placeholder="Enter Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-gray-800 text-md font-semibold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                required
                placeholder="Confirm Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {message && (
              <p className="text-red-500 text-sm font-semibold italic mb-4">
                {message}
              </p>
            )}

            <div className="flex items-center justify-between">
              <button
                className="bg-[#0c072cfd] w-full hover:bg-[#231d4cfd] text-white font-bold py-2 mt-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={submitReg}
              >
                Register
              </button>
            </div>

            <div className="mt-4">
              <p className="text-sm">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-[#1f4571] hover:underline font-medium hover:text-blue-800 text-md"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
