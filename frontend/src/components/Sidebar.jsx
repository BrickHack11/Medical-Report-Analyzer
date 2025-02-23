import React from "react";
import { FaHistory, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ user }) => {
  // Extract the first letter of the email (if available)
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "?";

  return (
    <div
      style={{
        width: "250px",
        background: "#6d8f85", // Single color for sidebar
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* Profile Circle */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "#4b6b61",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
          fontWeight: "bold",
          textTransform: "uppercase",
          marginBottom: "15px",
        }}
      >
        {userInitial}
      </div>

      <h2 style={{ marginBottom: "10px" }}>Dashboard</h2>

      {/* Divider Line */}
      <hr style={{ width: "100%", border: "0.5px solid white", marginBottom: "15px" }} />

      {/* Sidebar Sections */}
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "10px 15px" }}>
          <FaHistory style={{ marginRight: "10px" }} />
          <h4>Saved History</h4>
        </div>

        <ul style={{ listStyleType: "none", padding: "0 20px", textAlign: "left" }}>
          <li>Diabetes Report</li>
          <li>Diabetes Report</li>
          <li>Diabetes Report</li>
          <li>Diabetes Report</li>
          <li>Diabetes Report</li>
        </ul>

        {/* Additional Sections */}
        <div style={{ display: "flex", alignItems: "center", padding: "10px 15px" }}>
          <FaCog style={{ marginRight: "10px" }} />
          <h4>Settings</h4>
        </div>

        <div style={{ display: "flex", alignItems: "center", padding: "10px 15px" }}>
          <FaQuestionCircle style={{ marginRight: "10px" }} />
          <h4>Help</h4>
        </div>
      </div>

      {/* Logout Button */}
      <div style={{ marginTop: "auto", paddingBottom: "20px", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "10px 15px", cursor: "pointer" }}>
          <FaSignOutAlt style={{ marginRight: "10px" }} />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
