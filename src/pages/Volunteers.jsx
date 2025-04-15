import React, { useState, useEffect } from "react";
import "../styles/Volunteers.css";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    address: "",
    skills: "",
  });

  useEffect(() => {
    // Load volunteers from localStorage on component mount
    const storedVolunteers = JSON.parse(localStorage.getItem("volunteers")) || [];
    setVolunteers(storedVolunteers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    if (!formData.name || !formData.age || !formData.contact || !formData.address || !formData.skills) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedVolunteers = [...volunteers, formData];
    setVolunteers(updatedVolunteers);

    // Save updated volunteers to localStorage
    localStorage.setItem("volunteers", JSON.stringify(updatedVolunteers));

    setFormData({
      name: "",
      age: "",
      contact: "",
      address: "",
      skills: "",
    });
  };

  const handleDelete = (index) => {
    const updatedVolunteers = [...volunteers];
    updatedVolunteers.splice(index, 1);
    setVolunteers(updatedVolunteers);

    // Update localStorage after deletion
    localStorage.setItem("volunteers", JSON.stringify(updatedVolunteers));
  };

  return (
    <div className="volunteers-container">
      <h2 className="title">Volunteer Registration</h2>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter age"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            placeholder="Enter contact number"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            placeholder="Enter skills (e.g., First Aid)"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary" onClick={handleRegister}>
          Register
        </button>
      </div>

      <h4 className="registered-title">Registered Volunteers</h4>
      <ul className="volunteers-list">
        {volunteers.map((volunteer, index) => (
          <li key={index} className="volunteer-item">
            {volunteer.name} registered as a volunteer
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Volunteers;