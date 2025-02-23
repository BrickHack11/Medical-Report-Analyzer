import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} style={{
      background: "transparent",
      border: "none",
      color: "white",
      cursor: "pointer",
      display: "flex",
      alignItems: "center"
    }}>
      <span style={{ marginLeft: "5px" }}>🔓 Log out</span>    
    </button>
  );
};

export default LogoutButton;