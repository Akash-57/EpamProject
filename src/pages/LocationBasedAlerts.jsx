import React, { useEffect, useState } from 'react';
import "../styles/LocationBasedAlerts.css";

const disasterZones = [
  { id: 1, name: "Flood Zone - Riverbank", lat: 28.7041, lng: 77.1025, radius: 20 }, // in kilometers
  { id: 2, name: "Fire Zone - Forest Edge", lat: 19.076, lng: 72.8777, radius: 15 }
];

const LocationBasedAlerts = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      setUserLocation(parsedLocation);
      checkNearbyDisasters(parsedLocation);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(loc);
          localStorage.setItem("userLocation", JSON.stringify(loc)); // Save location to local storage
          checkNearbyDisasters(loc);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const checkNearbyDisasters = (location) => {
    const triggeredAlerts = disasterZones.filter((zone) => {
      const distance = getDistanceFromLatLonInKm(
        location.lat,
        location.lng,
        zone.lat,
        zone.lng
      );
      return distance <= zone.radius;
    });

    setAlerts(triggeredAlerts);
  };

  // Haversine formula to calculate distance between two coordinates
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  return (
    <div className="alert-container">
      <h2>📍 Location-Based Alerts</h2>
      {userLocation ? (
        alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert.id} className="alert-box danger">
              ⚠️ Alert: You are near a danger zone! - <strong>{alert.name}</strong>
            </div>
          ))
        ) : (
          <div className="alert-box safe">✅ You are in a safe zone.</div>
        )
      ) : (
        <p>Detecting your location...</p>
      )}
    </div>
  );
};

export default LocationBasedAlerts;