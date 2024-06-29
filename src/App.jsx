import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import NewEntry from "./components/newEntry";
import Navbar from "./components/navbar";
import ForgotPassword from "./components/forgotpassword";
import { useState } from "react";
import AllEntries from "./components/allEntries";
import ViewEntry from "./components/viewEntry";
import ResetPassword from "./components/resetpassword";
import Profile from "./components/profile";

const App = () => {
  const [email, setEmail] = useState("");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/entries" element={<AllEntries />} />
        <Route exact path="/newentry" element={<NewEntry />} />
        <Route
          path="/forgotpassword"
          element={<ForgotPassword setEmail={setEmail} />}
        />
        <Route
          path="/resetpassword"
          element={<ResetPassword email={email} />}
        />
        <Route exact path="/viewentry/:id" element={<ViewEntry />} />
        <Route exact path="/profile" element={<Profile/>}/>   
      </Routes>
    </Router>
  );
};
export default App;
