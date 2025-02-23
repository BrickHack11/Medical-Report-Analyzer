import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import uploadIcon from "./assets/upload.png";  
import magicIcon from "./assets/magic.png";
import reportIcon from "./assets/report.png";
import doctorsImage from "./assets/doctors.png"; 

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
      <div className="video-wrapper">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="content-container">
        {/* Left Section: Text */}
        <div className="text-section">
          <h1>Your Medical Reports, Simplified</h1>
          <p>
            Instantly generate an easy-to-read summary of your medical documents by
            following these simple steps:
          </p>

          <div className="steps">
            <div className="step">
              <img src={uploadIcon} alt="Upload" />
              <span>Upload your medical report</span>
            </div>
            <div className="step">
              <img src={magicIcon} alt="AI Magic" />
              <span>Let our AI do the magic</span>
            </div>
            <div className="step">
              <img src={reportIcon} alt="Report Ready" />
              <span>Your report summary is ready. Save your summary to view anytime.</span>
            </div>
          </div>

          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>

      {/* Right Section: Doctors Image (Fixed at bottom right) */}
      <div className="image-section">
        <img src={doctorsImage} alt="Doctors" />
      </div>
    </>
  );
}

export default App;
