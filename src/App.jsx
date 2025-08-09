import React from "react";

export default function App() {
  return (
    <div
      style={{
        backgroundImage: "url('/publichero.jpg')", // file in /public
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
        Northland Adventure Race
      </h1>
      <p style={{ maxWidth: 800, marginBottom: "1.25rem" }}>
        Corporate team building in Whangārei and across Northland. Tailored 2-hour
        foot races that get teams thinking, laughing, and moving.
      </p>
      <a
        href="#contact"
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          backgroundColor: "#059669",
          color: "#fff",
          borderRadius: "12px",
          textDecoration: "none",
        }}
      >
        Request a quote
      </a>
    </div>
  );
}
