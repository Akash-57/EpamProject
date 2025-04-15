import React, { useState, useEffect } from "react";
import "../styles/ResourceAllocation.css";

const ResourceAllocation = () => {
  const [resources, setResources] = useState([
    { name: "Food Supplies", quantity: 100 },
    { name: "Water Bottles", quantity: 200 },
    { name: "Blankets", quantity: 50 },
    { name: "Shelter Tents", quantity: 20 },
  ]);

  const [allocatedResources, setAllocatedResources] = useState([]);
  const [effectedBy, setEffectedBy] = useState("");
  const [location, setLocation] = useState("");
  const [selectedResource, setSelectedResource] = useState("");
  const [allocationQuantity, setAllocationQuantity] = useState(1);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedResources = JSON.parse(localStorage.getItem("resources"));
    const storedAllocations = JSON.parse(localStorage.getItem("allocatedResources"));

    if (storedResources) setResources(storedResources);
    if (storedAllocations) setAllocatedResources(storedAllocations);
  }, []);

  // Save resources and allocations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("resources", JSON.stringify(resources));
    localStorage.setItem("allocatedResources", JSON.stringify(allocatedResources));
  }, [resources, allocatedResources]);

  const allocateResource = () => {
    if (!effectedBy || !location || !selectedResource || allocationQuantity <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const resourceIndex = resources.findIndex(
      (resource) => resource.name === selectedResource
    );

    if (resourceIndex === -1 || resources[resourceIndex].quantity < allocationQuantity) {
      alert("Insufficient resources available.");
      return;
    }

    // Deduct the allocated quantity from the available resources
    const updatedResources = [...resources];
    updatedResources[resourceIndex].quantity -= allocationQuantity;

    // Create a new allocation entry
    const newAllocation = {
      effectedBy,
      location,
      resource: selectedResource,
      quantity: allocationQuantity,
    };

    // Update state and localStorage
    setResources(updatedResources);
    setAllocatedResources([...allocatedResources, newAllocation]);

    // Reset form fields
    setEffectedBy("");
    setLocation("");
    setSelectedResource("");
    setAllocationQuantity(1);
  };

  const deleteAllocation = (index) => {
    const allocationToDelete = allocatedResources[index];
    const updatedAllocations = [...allocatedResources];
    updatedAllocations.splice(index, 1);

    // Restore the allocated quantity back to the available resources
    const resourceIndex = resources.findIndex(
      (resource) => resource.name === allocationToDelete.resource
    );

    if (resourceIndex !== -1) {
      const updatedResources = [...resources];
      updatedResources[resourceIndex].quantity += allocationToDelete.quantity;
      setResources(updatedResources);
    }

    // Update state and localStorage
    setAllocatedResources(updatedAllocations);
  };

  return (
    <div className="container mt-4">
      <h2 className="title">Resource Allocation</h2>

      <div className="allocation-form">
        <h4>Allocate Resources</h4>
        <div className="form-group">
          <label htmlFor="effectedBy">Effected By</label>
          <input
            type="text"
            id="effectedBy"
            className="form-control"
            value={effectedBy}
            onChange={(e) => setEffectedBy(e.target.value)}
            placeholder="Enter disaster type"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location "
          />
        </div>
        <div className="form-group">
          <label htmlFor="resourceSelect">Select Resource</label>
          <select
            id="resourceSelect"
            className="form-control"
            value={selectedResource}
            onChange={(e) => setSelectedResource(e.target.value)}
          >
            <option value="">Select a resource</option>
            {resources.map((resource, index) => (
              <option key={index} value={resource.name}>
                {resource.name} ({resource.quantity} available)
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="allocationQuantity">Quantity</label>
          <input
            type="number"
            id="allocationQuantity"
            className="form-control"
            value={allocationQuantity}
            onChange={(e) => setAllocationQuantity(Number(e.target.value))}
            min="1"
          />
        </div>
        <button className="btn btn-primary" onClick={allocateResource}>
          Allocate Resource
        </button>
      </div>

      <h4 className="mt-4">Available Resources</h4>
      <ul className="list-group">
        {resources.map((resource, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            {resource.name} - {resource.quantity} available
          </li>
        ))}
      </ul>

      <h4 className="mt-4">Allocated Resources</h4>
      <ul className="list-group">
        {allocatedResources.map((allocation, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            People affected by {allocation.effectedBy} in {allocation.location} received{" "}
            {allocation.quantity} {allocation.resource}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteAllocation(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceAllocation;