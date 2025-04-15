import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Disaster Management System</h1>
      </header>
      <main className="landing-main">
        <h2>Welcome to the Disaster Management System</h2>
        <p><b>
        "In every crisis lies an opportunity — to act, to unite, and to rebuild stronger. Together, we can turn chaos into coordination."
        </b></p>
        <div className="landing-buttons">
          <button className="btn btn-primary" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/signup")}>
            Signup
          </button>
        </div>
      </main>
      <footer className="landing-footer">
        <p>© 2025 Disaster Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;