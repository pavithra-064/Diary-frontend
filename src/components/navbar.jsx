import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBookOpen, FaUserCircle } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "https://diary-backend-vs0o.onrender.com/api/user",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUsername(response.data.username);
        } catch (error) {
          setUsername("");
          console.error("Error fetching user data:", error);
          navigate("/");
        }
      } else {
        setUsername("");
      }
    };

    fetchUser();
  }, [navigate]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-[#0c072cfd] px-2 py-5 md:p-6 shadow-md  ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <FaBookOpen className="text-gray-500 text-xl" />{" "}
          <div className="pl-2 text-white text-sm md:text-md hidden md:block">
            EchoPages
          </div>
        </div>
        <div className="flex-grow text-center ">
          <p className="text-white text-sm md:text-md w-[60%] mx-auto">
            <i>Document Today, Treasure your Memories Forever</i>{" "}
          </p>
        </div>
        <div className="relative">
          {username ? (
            <button
              onClick={toggleDropdown}
              className="text-white flex items-center focus:outline-none"
            >
              <FaUserCircle className="text-xl md:text-2xl mr-2" />
              <span className="text-sm md:text-md mr-2">{username}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-white flex items-center focus:outline-none"
            >
              <FaUserCircle className="text-xl md:text-2xl  hidden md:block mr-2" />
              <span className="inline">Login</span>
            </button>
          )}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
              <Link
                to="/profile"
                onClick={closeDropdown}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                My Profile
              </Link>
              <Link
                to="/newentry"
                onClick={closeDropdown}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Add Entry
              </Link>
              <Link
                to="/entries"
                onClick={closeDropdown}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                View All Entries
              </Link>
              <div
                onClick={logout}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
