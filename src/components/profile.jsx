import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const response = await axios.get(
        "https://diary-backend-vs0o.onrender.com/api/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    fetchProfile();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const updateData = {};
      if (newEmail !== "") updateData.email = newEmail;
      if (newName !== "") updateData.name = newName;

      const response = await axios.put(
        "https://diary-backend-vs0o.onrender.com/api/profile/update",
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProfile();
      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      setMessage("Failed to update profile. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center p-4 m-2">
      <div className="max-w-sm mx-auto bg-formbg p-6 shadow-md rounded">
        <h2 className="text-3xl text-center font-bold mb-6">User's Profile</h2>
        <div className="flex flex-col w-full items-center mb-4">
          <FaUserCircle className="text-7xl mr-2 " />
          <div>
            <h3 className=" text-gray-800 text-[1.2rem] text-center  py-4">
              Name: {user.username}
            </h3>
            <p className=" text-gray-800 text-[1.1rem]">Email: {user.email}</p>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="newEmail"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Change Email:
          </label>
          <div className="flex">
            <input
              type="email"
              id="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500 w-full"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="newName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Change Username:
          </label>
          <div className="flex">
            <input
              type="text"
              id="newName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500 w-full"
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleProfileUpdate}
            className="bg-[#0c072cfd] hover:bg-[#231d4cfd] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Profile
          </button>
        </div>
        {message && <p className="text-sm text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;
