import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header.jsx";
import GameSection from "./GameSection.jsx";
import "./reset.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="main_container">
      <Header />
      <GameSection />
    </div>
  </React.StrictMode>
);
