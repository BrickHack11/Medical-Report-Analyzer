import React from "react";
import { FaHistory, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import activityhistory from "../assets/activityhistory.svg";  
import styles from "./Sidebar.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = ({ user }) => {
  // Extract the first letter of the email (if available)
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "?";
  
  const { logout } = useAuth0();
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

      <p style={{fontSize: "15px"}}>{user.email}</p>
      
      <div style={{display:"flex", gap: "20px", alignItems:"center", justifyContent:"center"}}>
          <img src={activityhistory} alt="AI Magic" />
          <h2 style={{ marginBottom: "10px", fontSize:"20px",color:"white" }}>Saved History</h2>

      </div>
      
      {/* Divider Line */}
      <hr style={{ width: "100%", border: "0.5px solid white", marginBottom: "15px" }} />

      {/* Sidebar Sections */}
      <div style={{ width: "100%" }}>


        <div className={styles.reportItems}>
        <button className={styles.reportBox}> Report : 2025-01-02 </button>
      <button className={styles.reportBox}> Report : 2025-01-02 </button>
      <button className={styles.reportBox}> Report : 2025-01-02 </button>
        </div>

      </div>

      <div className={styles.logoutContainer}>
        <div className={styles.logoutButton}>
          <FaSignOutAlt className={styles.logoutIcon} />
          <button className={styles.logoutbtn} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}> Logout </button>
        </div>
       </div>


    </div>
  );
};

export default Sidebar;
