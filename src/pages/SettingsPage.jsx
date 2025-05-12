import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const SettingsPage = () => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tasks");
    window.location.href = "/";
  };
  return (
    <>
      <div>Settings page</div>
      <button onClick={logout}>Logout</button>
      <button onClick={() => window.history.back()}>Go Back</button>
    </>
  );
};

export default SettingsPage;
