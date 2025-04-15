import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  React.useEffect(() => {
    // Redirect to login if the user is not authenticated
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="home-container">
      {!isAuthenticated ? (
        <>
          <header className="home-header">
            <h1>Disaster Management System</h1>
          </header>
          <main className="home-main">
            <h2>Welcome to the Disaster Management System</h2>
        
            <div className="home-buttons">
              <button className="btn btn-primary" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="btn btn-secondary" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </div>
          </main>
          <footer className="home-footer">
            <p>© 2025 Disaster Management System. All rights reserved.</p>
          </footer>
        </>
      ) : (
        <div className="welcome-container">
          <h2>Welcome to Home Page</h2>
          <p className="quotation">
          "When disaster strikes 🌪️, unity and action 🤝 are our greatest tools. Empowering response through technology 📡, we transform emergencies into opportunities for resilience 💪."
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;