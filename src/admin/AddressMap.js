import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/addressMap.css";

// Custom Icons
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1673/1673188.png",
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -35],
});

const volunteerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2991/2991537.png",
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -35],
});

// Component to Move Map Focus
const MapFocus = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 12, { animate: true, duration: 1.5 });
    }
  }, [position, map]);
  return null;
};

const AddressMap = () => {
  const [users, setUsers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState(null);
  const [focusedLocation, setFocusedLocation] = useState(null);
  const [viewType, setViewType] = useState("users"); // Toggle between users and volunteers
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const userResponse = await axios.get("http://localhost:9090/api/auth/");
        const volunteerResponse = await axios.get("http://localhost:9090/api/volunteers/");
        
        console.log("Fetched Users:", userResponse.data);
        console.log("Fetched Volunteers:", volunteerResponse.data);

        setUsers(userResponse.data);
        setVolunteers(volunteerResponse.data);
      } catch (err) {
        setError("Error fetching locations.");
        console.error(err);
      }
    };
    fetchLocations();
  }, []);

  const handleLocationClick = (lat, lng) => {
    setFocusedLocation([lat, lng]);
    if (mapContainerRef.current) {
      mapContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="map-container">
      <h2>📍 Address Visualization on Map (OpenStreetMap)</h2>
      {error && <p className="error">{error}</p>}
      
      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button onClick={() => setViewType("users")} className={viewType === "users" ? "active" : ""}>View Users</button>
        <button onClick={() => setViewType("volunteers")} className={viewType === "volunteers" ? "active" : ""}>View Volunteers</button>
      </div>

      {/* Map Display */}
      <div ref={mapContainerRef}>
        <MapContainer center={[18.5204, 73.8567]} zoom={12} style={{ height: "500px", width: "100%" }} ref={mapRef}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />

          {(viewType === "users" ? users : volunteers).map((loc) =>
            loc.latitude && loc.longitude ? ( // ✅ Fixed the property names
              <Marker key={loc.id} position={[loc.latitude, loc.longitude]} icon={viewType === "users" ? userIcon : volunteerIcon}>
                <Popup>
                  <strong>{loc.name}</strong> <br /> {/* ✅ Fixed property name */}
                  📍 {loc.type || "Volunteer"} <br /> {/* ✅ Display volunteer type */}
                  📞 {loc.contactNumber}
                </Popup>
              </Marker>
            ) : null
          )}

          {focusedLocation && <MapFocus position={focusedLocation} />}
        </MapContainer>
      </div>

      {/* Location List */}
      <div className="location-list">
        <h3>📌 {viewType === "users" ? "User" : "Volunteer"} Locations (Click to Focus)</h3>
        {(viewType === "users" ? users : volunteers).length === 0 ? (
          <p>No {viewType} requests found.</p>
        ) : (
          <ul>
            {(viewType === "users" ? users : volunteers).map((location) =>
              location.latitude && location.longitude ? (
                <li key={location.id} className="clickable-location" onClick={() => handleLocationClick(location.latitude, location.longitude)}>
                  <strong>{location.name}:</strong> {location.type || "Volunteer"}
                </li>
              ) : null
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddressMap;
