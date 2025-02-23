import React from "react";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ user }) => {
  return (
    <div style={{ width: "250px", background: "#6d8f85", color: "white", padding: "20px", display: "flex", flexDirection: "column", height: "100vh" }}>
      <h2>Dashboard</h2>
      <h4>Saved History</h4>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>Diabetes report</li>
        <li>Diabetes report</li>
        <li>Diabetes report</li>
        <li>Diabetes report</li>
        <li>Diabetes report</li>
      </ul>
      <div style={{ marginTop: "auto", paddingBottom: "20px" }}>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
