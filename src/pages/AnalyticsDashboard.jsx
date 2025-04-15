import React, { useState, useEffect } from "react";
import "../styles/AnalyticsDashboard.css";

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [metrics, setMetrics] = useState({
    incidentsReported: 0,
    resourcesAllocated: 0,
    activeVolunteers: 0,
    areasAffected: 0,
  });

  const updateMetrics = () => {

    const incidents = JSON.parse(localStorage.getItem("incidents")) || [];
    const allocatedResources = JSON.parse(localStorage.getItem("allocatedResources")) || [];
    const volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];


    const incidentsReported = incidents.length;
    const resourcesAllocated = allocatedResources.reduce(
      (total, allocation) => total + allocation.quantity,
      0
    );
    const activeVolunteers = volunteers.length;
    const areasAffected = new Set(incidents.map((incident) => incident.location)).size;

  
    setMetrics({
      incidentsReported,
      resourcesAllocated,
      activeVolunteers,
      areasAffected,
    });
  };

  useEffect(() => {
   
    updateMetrics();


    const handleStorageChange = () => {
      updateMetrics();
    };

    window.addEventListener("storage", handleStorageChange);


    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Analytics Dashboard</h1>
        <div className="time-filter">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="btn btn-primary"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="dashboard-grid">
        <div className="metric-card">
          <div className="metric-title">⚠ Incidents Reported</div>
          <div className="metric-value">{metrics.incidentsReported}</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">🛠 Resources Allocated</div>
          <div className="metric-value">{metrics.resourcesAllocated}</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">👥 Active Volunteers</div>
          <div className="metric-value">{metrics.activeVolunteers}</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">📍 Areas Affected</div>
          <div className="metric-value">{metrics.areasAffected}</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;