import React, { useEffect, useState } from "react";
import { FaHistory, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import activityhistory from "../assets/activityhistory.svg";  
import styles from "./Sidebar.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = ({ user }) => {
  const { logout } = useAuth0();
  const [reports, setReports] = useState([]); // Store fetched reports

  // Fetch reports from API
  useEffect(() => {
    const fetchReports = async () => {
      if (!user?.email) return; // Ensure user is logged in

      try {
        const response = await fetch("http://127.0.0.1:5000/fetch_reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_email: user.email }),
        });

        if (!response.ok) throw new Error("Failed to fetch reports");

        const data = await response.json();
        setReports(data.reports); // Store reports in state
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [user]);

  // Extract the first letter of the email (if available)
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "?";

  return (
    <div
      style={{
        width: "200px",
        background: "#6d8f85", 
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
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          backgroundColor: "#C9A227",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "30px",
          fontWeight: "bold",
          textTransform: "uppercase",
          marginBottom: "15px",
        }}
      >
        {userInitial}
      </div>

      <p style={{ fontSize: "15px" }}>{user.email}</p>
      
      <div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
          <img src={activityhistory} alt="AI Magic" />
          <h2 style={{ marginBottom: "10px", fontSize: "20px", color: "white" }}>Saved History</h2>
      </div>
      
      {/* Divider Line */}
      <hr style={{ width: "100%", border: "0.5px solid white", marginBottom: "15px" }} />

      {/* Display Fetched Reports */}
      <div style={{ width: "100%" }}>
        {reports.length > 0 ? (
          <div className={styles.reportItems}>
            {reports.map((report) => (
              <button key={report._id} className={styles.reportBox}>
                {/* {report.file_name} - {report.date_added} */}
                Report - {report.date_added} 
              </button>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "white" }}>No reports found</p>
        )}
      </div>

      {/* Logout Button */}
      <div className={styles.logoutContainer}>
        <div className={styles.logoutButton}>
          <FaSignOutAlt className={styles.logoutIcon} />
          <button
            className={styles.logoutbtn}
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
