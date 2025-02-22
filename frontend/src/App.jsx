import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

function App() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/analyze");
    } else {
      loginWithRedirect();
    }
  };
  
  return (
    <>
      <button onClick={handleGetStarted}>Get Started</button>
       
      <div className="container">
      <div className="video-wrapper">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div> {/* Gradient overlay */}
      </div>

      <div className="content">
        <h1 className="fade-in-text">Welcome to My Website</h1>
        <p className="fade-in-text">
          This is a demo of a background video with advanced effects.
        </p>
      </div>
    </div>
  </>

  );

  
}

export default App;
