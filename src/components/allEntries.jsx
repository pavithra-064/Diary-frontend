import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaPlus,
  FaArrowUp,
  FaArrowDown,
  FaSearch,
  FaTrash,
} from "react-icons/fa";

const AllEntries = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [ascending, setAscending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      const response = await axios.get(
        "https://diary-backend-vs0o.onrender.com/api/allentries",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEntries(response.data);
      setSortedData(response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [navigate]);

  const journalName = "My Journal";

  const handleNewEntry = () => {
    navigate("/newentry");
  };

  const sortByDateAsc = () => {
    const sorted = [...sortedData].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setSortedData(sorted);
    setAscending(true);
  };

  const sortByDateDesc = () => {
    const sorted = [...sortedData].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setSortedData(sorted);
    setAscending(false);
  };

  const handleSearch = () => {
    let filtered = [...entries];

    if (searchTerm) {
      filtered = filtered.filter(
        (entry) =>
          entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (fromDate) {
      filtered = filtered.filter(
        (entry) => new Date(entry.date) >= new Date(fromDate)
      );
    }

    setSortedData(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, fromDate]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://diary-backend-vs0o.onrender.com/api/deleteentry/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchEntries();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-[#dedfe0] p-6 flex flex-col items-center">
        <div className="w-full max-w-3xl mb-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold">{journalName}</h2>
              <span className="mr-4">Total Entries: {entries.length}</span>
            </div>
            <button
              onClick={handleNewEntry}
              className="border-2 hover:bg-white text-xs md:text-[1rem] border-blue-950 text-[#313f63] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              <FaPlus className="mr-2" />
              New Entry
            </button>
          </div>
        </div>
        <div className="w-full max-w-3xl flex flex-col justify-between md:flex-row items-center mb-4">
          <div className="relative w-full md:w-auto mb-4 md:mb-0 md:mr-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 w-full md:w-80"
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <FaSearch />
            </button>
          </div>
          <div className="flex items-center w-full md:w-auto">
            <label htmlFor="fromDate" className="mr-2 text-gray-600">
              From Date:
            </label>
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border border-gray-300 rounded-lg py-1 md:py-2 px-2 text-md md:px-4 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-10">
        {sortedData.length > 0 ? (
          <div className="overflow-x-auto overflow-y-auto max-h-96">
            <table className="min-w-full divide-y divide-gray-900">
              <thead className="bg-[#dedfe0] ">
                <tr>
                  <th className="px-2 md:px-10 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">
                    Entry
                  </th>
                  <th className="px-2 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">
                    <button
                      onClick={ascending ? sortByDateDesc : sortByDateAsc}
                      className="flex items-center text-gray-700 py-2"
                    >
                      Date Created
                      {ascending ? (
                        <FaArrowUp className="ml-2" />
                      ) : (
                        <FaArrowDown className="ml-2" />
                      )}
                    </button>
                  </th>
                  <th className="px-2 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
                <tr>
                  <td colSpan="4">
                    <hr className="border-t border-gray-900" />
                  </td>
                </tr>
              </thead>
              <tbody className="bg-[#dedfe0] divide-y divide-gray-400 overflow-y-auto max-h-80">
                {sortedData.map((entry) => (
                  <tr
                    key={entry.id}
                    className="hover:bg-gray-50 cursor-pointer border-t border-gray-200"
                    onClick={() => navigate(`/viewentry/${entry._id}`)}
                  >
                    <td className="px-2 md:px-10 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-700">
                      <div>{entry.title}</div>
                      <div className="hidden md:block">
                        {entry.content.substring(0, 40)}....
                      </div>
                    </td>
                    <td className="px-2 md:px-10 py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">
                      {entry.date}
                    </td>
                    <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">
                      <FaTrash
                        className="text-gray-600 hover:text-red-500 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click event
                          handleDelete(entry._id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">
            No entries found. Click the button above to create a new entry.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllEntries;
