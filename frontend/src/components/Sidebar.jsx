import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import activityhistory from "../assets/activityhistory.svg";  
import styles from "./Sidebar.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = ({ user, setSelectedReport }) => {
  const { logout } = useAuth0();
  const [reports, setReports] = useState([]);

  // Fetch reports from API
  useEffect(() => {
    const fetchReports = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch("http://127.0.0.1:5000/fetch_reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_email: user.email }),
        });

        if (!response.ok) throw new Error("Failed to fetch reports");

        const data = await response.json();
        setReports(data.reports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [user]);

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "?";

  return (
    <div className={styles.sidebarContainer}>
      {/* Profile Circle */}
      <div className={styles.profileCircle}>{userInitial}</div>
      <p className={styles.userEmail}>{user.email}</p>

      <div className={styles.savedHistory}>
        <img src={activityhistory} alt="AI Magic" />
        <h2>Saved History</h2>
      </div>

      <hr className={styles.divider} />

      {/* Report List */}
      <div className={styles.reportItems}>
        {reports.length > 0 ? (
          reports.map((report, index) => (
            <button 
              key={report._id} 
              className={styles.reportBox} 
              onClick={() => setSelectedReport(report)}
            >
              Report {index + 1} - {report.date_added}
            </button>
          ))
        ) : (
          <p className={styles.noReports}>No reports found</p>
        )}
      </div>

      {/* Logout Button (Now Stays at Bottom) */}
      <div className={styles.logoutContainer}>
        <button className={styles.logoutButton} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          <FaSignOutAlt className={styles.logoutIcon} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
