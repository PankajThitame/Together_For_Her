import API_BASE_URL from "../apiConfig";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
  const [viewType, setViewType] = useState("users");
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const userResponse = await axios.get(`${process.env.REACT_APP_API_URL || "${API_BASE_URL}"}/auth/`);
        const volunteerResponse = await axios.get(`${process.env.REACT_APP_API_URL || "${API_BASE_URL}"}/volunteers/`);
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
    <div className="p-6 m-6 bg-white dark:bg-slate-900/40 backdrop-blur-md rounded-xl shadow-md text-center font-sans border border-transparent dark:border-slate-800 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-[#2c3e50] dark:text-slate-100 mb-6 uppercase tracking-tight">📍 Address Visualization on Map (OpenStreetMap)</h2>
      {error && <p className="text-red-600 dark:text-red-400 font-semibold mb-4">{error}</p>}

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setViewType("users")}
          className={`px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs border ${viewType === "users" ? "bg-pink-600 text-white shadow-lg shadow-pink-200" : "bg-white dark:bg-slate-800 border-pink-200 dark:border-slate-700 text-pink-600"
            } transition-all duration-300 transform hover:-translate-y-0.5`}
        >
          View Users
        </button>
        <button
          onClick={() => setViewType("volunteers")}
          className={`px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs border ${viewType === "volunteers" ? "bg-pink-600 text-white shadow-lg shadow-pink-200" : "bg-white dark:bg-slate-800 border-pink-200 dark:border-slate-700 text-pink-600"
            } transition-all duration-300 transform hover:-translate-y-0.5`}
        >
          View Volunteers
        </button>
      </div>

      {/* Map Display */}
      <div ref={mapContainerRef} className="rounded-xl overflow-hidden mb-6">
        <MapContainer
          center={[18.5204, 73.8567]}
          zoom={12}
          className="w-full h-[450px]"
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {(viewType === "users" ? users : volunteers).map((loc) =>
            loc.latitude && loc.longitude ? (
              <Marker
                key={loc.id}
                position={[loc.latitude, loc.longitude]}
                icon={viewType === "users" ? userIcon : volunteerIcon}
              >
                <Popup>
                  <strong>{loc.name}</strong> <br />
                  📍 {loc.type || "Volunteer"} <br />
                  📞 {loc.contactNumber}
                </Popup>
              </Marker>
            ) : null
          )}
          {focusedLocation && <MapFocus position={focusedLocation} />}
        </MapContainer>
      </div>

      {/* Location List */}
      <div className="text-left px-4 sm:px-10">
        <h3 className="text-2xl font-bold text-[#2c3e50] dark:text-slate-100 mb-6 flex items-center gap-3">
          📌 {viewType === "users" ? "User" : "Volunteer"} Locations
          <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
        </h3>
        {(viewType === "users" ? users : volunteers).length === 0 ? (
          <p className="text-gray-500 dark:text-slate-500 italic">No {viewType} requests found in the system.</p>
        ) : (
          <ul className="space-y-3">
            {(viewType === "users" ? users : volunteers).map((location) =>
              location.latitude && location.longitude ? (
                <li
                  key={location.id}
                  onClick={() => handleLocationClick(location.latitude, location.longitude)}
                  className="bg-gray-100 dark:bg-slate-800/60 rounded-2xl px-6 py-4 shadow-sm cursor-pointer hover:bg-pink-50 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700 transition-all group"
                >
                  <strong className="text-[#2c3e50] dark:text-slate-200 group-hover:text-pink-600 transition-colors uppercase text-xs tracking-widest">{location.name}:</strong>
                  <span className="ml-2 text-gray-700 dark:text-slate-400 font-medium italic">{location.type || "Volunteer"}</span>
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
