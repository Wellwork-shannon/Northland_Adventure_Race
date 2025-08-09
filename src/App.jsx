import React from "react";
import "./App.css";

function App() {
  return (
    <div
      style={{
        backgroundImage: "url('/publichero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h1>Northland Adventure Race</h1>
      <p>
        Corporate team-building experiences through a 2-hour Amazing Race-style
        adventure in Whangārei and the wider Northland region.
      </p>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#ff6600",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Contact Us
      </button>
    </div>
  );
}

export default App;
