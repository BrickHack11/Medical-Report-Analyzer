import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

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
    </>
  );
}

export default App;
