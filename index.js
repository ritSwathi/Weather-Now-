import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";      // import your main App component
import "./style.css";         // import your CSS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
