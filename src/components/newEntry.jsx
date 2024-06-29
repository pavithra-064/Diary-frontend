import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const NewEntry = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSave = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    if (!title || !date || !description) {
      setMessage("Enter All Details");
    } else {
      const formattedDate = date.toISOString().split("T")[0];
      const newEntry = {
        title,
        date: formattedDate,
        content: description,
      };

      axios
        .post(
          "https://diary-backend-vs0o.onrender.com/api/newentry",
          newEntry,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data.success) {
            alert("Entry saved successfully!");
            navigate("/entries");
          } else {
            alert(
              response.data.message ||
                "Failed to save entry. Please try again later."
            );
          }
        })
        .catch((error) => {
          if (error.response) {
            const { status, data } = error.response;
            if (status === 401) {
              alert("Unauthorized. Please login again.");
              navigate("/");
            } else {
              alert(
                data.message || "Failed to save entry. Please try again later."
              );
            }
          } else {
            console.error("Error saving entry:", error);
            alert("An unexpected error occurred. Please try again later.");
          }
        });
    }
  };

  return (
    <div className="min-h-screen p-4 mt-10 m-1">
      <div className="max-w-2xl min-h-[37rem] mx-auto bg-formbg p-8 shadow-md rounded">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">New Entry</h2>
          <button
            onClick={() => navigate("/entries")}
            className="text-red-600 underline font-bold -mt-5 text-sm  px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="title"
            placeholder="Entry Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" appearance-none text-2xl  bg-transparent rounded w-full py-0   text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <hr className="my-4 border-1 border-gray-600" />
        <div className="mb-4">
          {/* <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label> */}
          <div className="relative flex items-center">
            <div
              className="pr-3 cursor-pointer"
              onClick={() =>
                document
                  .querySelector(".react-datepicker__input-container input")
                  .focus()
              }
            >
              <FaCalendarAlt className="text-gray-500" />
            </div>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className=" appearance-none bg-transparent  rounded w-full py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <hr className="my-4 border-1 border-gray-600" />
        <div className="mb-4">
          {/* <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label> */}
          <textarea
            id="description"
            placeholder="Your Entry Here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border bg-transparent  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-72 overflow-y-scroll resize-none"
          ></textarea>
        </div>
        {message && (
          <p className="text-red-500 text-sm font-semibold italic mb-4">
            {message}
          </p>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={handleSave}
            className="bg-[#0c072cfd] hover:bg-[#231d4cfd] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
