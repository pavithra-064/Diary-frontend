import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const ViewEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await axios.get(
          `https://diary-backend-vs0o.onrender.com/api/viewentry/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEntry(response.data);
        setTitle(response.data.title);
        setDate(response.data.date);
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching entry:", error);
      }
    };

    fetchEntry();
  }, [id, navigate]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveMessage("Saving...");

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      const updatedEntry = {
        title,
        date,
        content,
      };

      await axios.put(
        `https://diary-backend-vs0o.onrender.com/api/editentry/${id}`,
        updatedEntry,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsSaving(false);
      setSaveMessage("Saved");
      setTimeout(() => {
        setSaveMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error saving entry:", error);
      setIsSaving(false);
      setSaveMessage("Error saving");
    }
  };

  if (!entry) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-4xl mx-auto bg-[#dedfe0] p-6 shadow-md rounded">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Edit Entry</h2>
          <button
            onClick={() => navigate("/entries")}
            className="text-red-600 underline font-bold -mt-5 text-sm  px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Entries
          </button>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <hr className="my-4" />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
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
              selected={new Date(date)}
              onChange={(newDate) => setDate(newDate)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <hr className="my-4" />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48 overflow-y-scroll"
          ></textarea>
        </div>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <button
            onClick={handleSave}
            className="bg-[#0c072cfd] hover:bg-[#231d4cfd] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
        {saveMessage && <p>{saveMessage}</p>}
      </div>
    </div>
  );
};

export default ViewEntry;
