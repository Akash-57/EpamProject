import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Signup.css"; // Import the new CSS file

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      const parsedUser = JSON.parse(existingUser);
      if (parsedUser.username === username) {
        setError("Account already exists. Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }
    }

    // Save the new user to localStorage
    localStorage.setItem("user", JSON.stringify({ username, password }));
    navigate("/login");
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Signup</h2>
        {error && (
          <div className="alert alert-warning" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Signup
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
          <p>
            <Link to="/">Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;