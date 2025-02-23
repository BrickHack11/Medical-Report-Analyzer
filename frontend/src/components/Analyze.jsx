import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Sidebar from "./Sidebar";
import UploadSection from "./UploadSection";

const Analyze = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar user={user} />
      <div style={{ flex: 1, padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <UploadSection />
      </div>
    </div>
    )
  );
};

export default Analyze;