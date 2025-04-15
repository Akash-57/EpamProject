import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import IncidentReports from "./pages/IncidentReports";
import ResourceAllocation from "./pages/ResourceAllocation";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import Volunteers from "./pages/Volunteers";
import LocationBasedAlerts from "./pages/LocationBasedAlerts"; 
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route to LandingPage */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes (with Navbar) */}
        <Route element={<LayoutWithNavbar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/incident-reports" element={<IncidentReports />} />
          <Route path="/resource-allocation" element={<ResourceAllocation />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/location-based-alerts" element={<LocationBasedAlerts />} /> {/* Added LocationBasedAlerts route */}
          <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

// Layout component that includes the Navbar for protected routes
const LayoutWithNavbar = () => {
  return (
    <div>
      <Navbar />
      <div className="main-content" style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default App;