import React, { useState, useEffect } from "react";
import "../styles/IncidentReports.css";

const IncidentReports = () => {
  const [incidents, setIncidents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIncident, setCurrentIncident] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    location: "",
    type: "",
    severity: "medium",
    status: "pending",
    reportedOn: "",
  });


  const disasterTypes = [
    "Flood",
    "Earthquake",
    "Wildfire",
    "Hurricane",
    "Tornado",
    "Tsunami",
    "Other",
  ];

  useEffect(() => {
    const storedIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
    setIncidents(storedIncidents);
  }, []);

  const saveIncidentsToStorage = (updatedIncidents) => {
    localStorage.setItem("incidents", JSON.stringify(updatedIncidents));
    setIncidents(updatedIncidents);
  };

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter
      ? incident.status === statusFilter
      : true;
    const matchesSeverity = severityFilter
      ? incident.severity === severityFilter
      : true;

    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const handleAddIncident = () => {
    setCurrentIncident(null);
    setFormData({
      id: "",
      title: "",
      location: "",
      type: "",
      severity: "medium",
      status: "pending",
      reportedOn: "",
    });
    setIsModalOpen(true);
  };

  const handleEditIncident = (incident) => {
    setCurrentIncident(incident);
    setFormData(incident);
    setIsModalOpen(true);
  };

  const handleDeleteIncident = (id) => {
    const updatedIncidents = incidents.filter((incident) => incident.id !== id);
    saveIncidentsToStorage(updatedIncidents);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (currentIncident) {
   
      const updatedIncidents = incidents.map((incident) =>
        incident.id === currentIncident.id ? { ...formData } : incident
      );
      saveIncidentsToStorage(updatedIncidents);
    } else {
    
      const newIncident = {
        ...formData,
        id: Date.now(),
        reportedOn: new Date().toISOString(),
      };
      saveIncidentsToStorage([...incidents, newIncident]);
    }
    setIsModalOpen(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "in-progress":
        return "status-in-progress";
      case "resolved":
        return "status-resolved";
      default:
        return "";
    }
  };

  return (
    <div className="incident-reports">
      <div className="container">
        <div className="welcome-banner">
          <h1>Welcome to the Incident Reports</h1>
          <p>Track and manage emergency incidents in real-time</p>
        </div>

        <h2 className="section-title">Incident Reports</h2>

        <div className="incident-actions">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleAddIncident}>
            + Add New Incident
          </button>
        </div>

        <table className="incidents-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Location</th>
              <th>Type</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Reported On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncidents.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.id}</td>
                <td>{incident.title}</td>
                <td>{incident.location}</td>
                <td>{incident.type}</td>
                <td>{incident.severity}</td>
                <td>
                  <span className={`status ${getStatusClass(incident.status)}`}>
                    {incident.status.replace("-", " ")}
                  </span>
                </td>
                <td>{new Date(incident.reportedOn).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditIncident(incident)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteIncident(incident.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{currentIncident ? "Edit Incident" : "Add New Incident"}</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select a type</option>
                  {disasterTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Severity</label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleFormChange}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {currentIncident ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentReports;