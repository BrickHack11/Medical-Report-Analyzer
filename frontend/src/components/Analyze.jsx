import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import UploadSection from "./UploadSection";

const Analyze = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [selectedReport, setSelectedReport] = useState(null);

  // ✅ Ensure Auth0 query params are cleared from the URL
  // useEffect(() => {
  //   if (window.location.search.includes("code") || window.location.search.includes("state")) {
  //     window.history.replaceState({}, document.title, window.location.pathname);
  //   }
  // }, []);

  // ✅ Debugging: Log authentication state
  console.log("User:", user);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("isLoading:", isLoading);

  // ✅ Prevent blank screen while authentication is loading
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // ✅ Prevent blank screen if not authenticated
  // if (!isAuthenticated) {
  //   return <div>Please log in to continue...</div>;
  // }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar user={user} setSelectedReport={setSelectedReport} />
      <div style={{ flex: 1, padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <UploadSection selectedReport={selectedReport} setSelectedReport={setSelectedReport} />
      </div>
    </div>
  );
};

export default Analyze;
