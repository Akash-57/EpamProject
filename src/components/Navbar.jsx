import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication and user data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    navigate("/"); // Redirect to Landing Page
  };

  return (
    <nav className="navbar">
      <h1
        className="logo"
        onClick={() => navigate("/home")}
        style={{ cursor: "pointer" }}
      >
        Disaster Management
      </h1>

      <ul className="nav-links">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/incident-reports"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Incident Reports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/resource-allocation"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Resource Allocation
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/volunteers"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Volunteers
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/location-based-alerts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            LocationBasedAlerts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/analytics-dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Analytics Dashboard
          </NavLink>
        </li>
      </ul>

      <button
        className="logout-btn"
        onClick={handleLogout}
        aria-label="Logout"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;