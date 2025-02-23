import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import Analyze from "./components/Analyze.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-nrtgu8ldxckio66d.us.auth0.com"
    clientId="IPUZo961F5VIc9tX7lmjAFEx1X2Tp9Um"
    authorizationParams={{
      redirect_uri: window.location.origin + "/analyze",
    }}
  >
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/temp" element={<div></div>} />
      </Routes>
    </Router>
  </Auth0Provider>
);




// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Auth0Provider } from '@auth0/auth0-react';

// const domain = import.meta.env.VITE_AUTH0_DOMAIN;
// const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <Auth0Provider
// //       domain={domain}
// //       clientId={clientId}
// //       redirectUri={window.location.origin}>
// //       <App />
// //     </Auth0Provider>
// //   </StrictMode>,
// // )

// const root = createRoot(document.getElementById('root'));

// root.render(
// <Auth0Provider
//     domain="dev-nrtgu8ldxckio66d.us.auth0.com"
//     clientId="IPUZo961F5VIc9tX7lmjAFEx1X2Tp9Um"
//     authorizationParams={{
//       redirect_uri: window.location.origin
//     }}
//   >
//     <App />
//   </Auth0Provider>,
// );



// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.jsx'

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>,
// // )
