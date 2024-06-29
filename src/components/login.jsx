import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/entries");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();

    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;

    if (!email || regex.test(email) === false) {
      setMessage("Enter a valid email ID");
    } else {
      try {
        const response = await axios.post(
          "https://diary-backend-vs0o.onrender.com/api/login",
          {
            email,
            password,
          }
        );
        const { token, message: msg } = response.data;

        if (token) {
          localStorage.setItem("token", token);
          setMessage("");
          navigate("/entries");
        } else {
          setMessage(msg || "An unexpected error occurred. Please try again.");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setMessage("Wrong password. Enter password correctly.");
        } else if (error.response && error.response.status === 404) {
          setMessage("User not found. Please register.");
        } else {
          setMessage("An error occurred. Please try again later.");
        }
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[80%] md:w-[32%] flex flex-col p-5 md:p-10 bg-[#dedfe0] rounded-lg shadow-lg">
        <h3 className="text-2xl text-center font-bold mb-6 ">Login</h3>

        <form onSubmit={login}>
          <div className="mb-6">
            <label
              className="block text-gray-800 text-md font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label
                className="block text-gray-800 text-md font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <button
                type="button"
                className="inline-block align-baseline text-sm hover:underline  text-[#1f4571] font-medium hover:text-blue-800"
                onClick={() => navigate("/forgotpassword")}
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              className="shadow appearance-none border bg-[#ffffff] rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {message && (
            <p className="text-red-500 text-sm font-semibold italic mb-4">
              {message}
            </p>
          )}

          <div className="flex items-center">
            <button
              className="bg-[#0c072cfd] w-full  hover:bg-[#231d4cfd] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#1f4571] hover:underline  font-medium hover:text-blue-800"
            >
              Create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
