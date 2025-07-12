import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [company, setCompany] = useState("TCS");
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/interview/${company.toLowerCase()}`);
  };

  return (
    <div style={{
      background: "#0f0f0f",
      color: "#ffffff",
      minHeight: "100vh",
      fontFamily: "Segoe UI, sans-serif",
    }}>
      {/* 🔼 NAVIGATION BAR */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        borderBottom: "1px solid #1f2937",
        background: "#0f0f0f"
      }}>
        {/* Logo */}
        <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#FBBF24" }}>
          VirtualHire
        </div>

        {/* Menu Links */}
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <a href="#" style={navLink}>Home</a>
          <a href="#" style={navLink}>About</a>
          <a href="#" style={navLink}>Contact</a>
          <button
            onClick={() => alert("Reach Out clicked!")}
            style={{
              background: "#FBBF24",
              color: "#0f0f0f",
              padding: "8px 20px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Reach Out
          </button>
        </div>
      </nav>

      {/* 🔽 MAIN CONTENT */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 20px"
      }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/706/706797.png"
          alt="avatar"
          style={{ width: 160, height: 160, marginBottom: 30 }}
        />

        <h3 style={{ color: "#d1d5db", marginBottom: 10 }}>HI, I AM VIRTUALHIRE, I PREPARE</h3>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#FBBF24",
          textAlign: "center",
          marginBottom: 10
        }}>
          THE PERFECT CANDIDATE
        </h1>
        <p style={{
          color: "#9CA3AF",
          fontSize: "1rem",
          textAlign: "center",
          maxWidth: 500,
          marginBottom: 30
        }}>
          Select a company, complete the interview process, and receive a personalized offer letter!
        </p>

        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{
            padding: "10px 20px",
            borderRadius: 6,
            fontSize: "1rem",
            marginBottom: 20,
            outline: "none"
          }}
        >
          <option>TCS</option>
          <option>Infosys</option>
          <option>Google</option>
          <option>Amazon</option>
        </select>

        <button
          onClick={handleStart}
          style={{
            backgroundColor: "#F59E0B",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
            marginBottom: 20
          }}
        >
          Start Your Interview Journey
        </button>
      </div>
    </div>
  );
};

// Navigation link style
const navLink = {
  color: "#d1d5db",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: 500,
  cursor: "pointer"
};

export default Home;

