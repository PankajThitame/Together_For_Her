import API_BASE_URL from "../apiConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapMarkedAlt, FaListUl, FaCheck, FaUser } from "react-icons/fa";

// Custom Icon for Requests
const requestIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -30],
});

const NearbyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [viewMode, setViewMode] = useState("map"); // map or list
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            // For now fetching all requests, in real app would be /api/requests/nearby
            const res = await axios.get(`${API_BASE_URL}/requests`);
            // Filter for PENDING requests
            const pending = res.data.filter(r => r.status === "PENDING");
            setRequests(pending);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching requests:", err);
            // Fallback mock data if backend empty/fails for demo
            setRequests([
                { id: 1, user: { name: "Sarah Connor" }, address: "123 Main St, Pune", reason: "Urgent need for hygiene kit", latitude: 18.5204, longitude: 73.8567, status: "PENDING" },
                { id: 2, user: { name: "Ellen Ripley" }, address: "456 Market Rd, Mumbai", reason: "Support for 3 women", latitude: 19.0760, longitude: 72.8777, status: "PENDING" },
            ]);
            setLoading(false);
        }
    };

    const handleAccept = (id) => {
        alert(`Task #${id} accepted! (Mock Action)`);
        // In real app: PUT /api/requests/{id}/assign
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Nearby Requests</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold">Find and help women in need near you.</p>
                </div>

                <div className="flex bg-white/50 dark:bg-slate-800/50 backdrop-blur-md p-1 rounded-xl border border-pink-200/50 dark:border-slate-500/50">
                    <button
                        onClick={() => setViewMode("map")}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === "map" ? "bg-pink-500 text-white shadow-lg" : "text-slate-500 hover:text-pink-500"
                            }`}
                    >
                        <FaMapMarkedAlt /> Map View
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === "list" ? "bg-pink-500 text-white shadow-lg" : "text-slate-500 hover:text-pink-500"
                            }`}
                    >
                        <FaListUl /> List View
                    </button>
                </div>
            </div>

            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-[2.5rem] border border-pink-300/70 dark:border-slate-500/50 shadow-xl overflow-hidden min-h-[500px] relative">
                {loading ? (
                    <div className="flex items-center justify-center h-full text-slate-400 font-bold">Finding requests...</div>
                ) : viewMode === "map" ? (
                    <MapContainer center={[18.5204, 73.8567]} zoom={10} className="w-full h-[600px] z-0">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        {requests.map(req => (
                            (req.latitude || req.latitude === undefined) && ( // Allow items without lat/long to not crash, or mock them
                                <Marker
                                    key={req.id}
                                    position={[req.latitude || 18.52 + Math.random() / 10, req.longitude || 73.85 + Math.random() / 10]}
                                    icon={requestIcon}
                                >
                                    <Popup className="glass-popup">
                                        <div className="p-2 min-w-[200px]">
                                            <h3 className="font-bold text-slate-800 mb-1">{req.user?.name || "Anonymous User"}</h3>
                                            <p className="text-xs text-slate-500 mb-2">{req.address}</p>
                                            <div className="text-xs bg-pink-50 text-pink-600 p-2 rounded-lg mb-3 italic">"{req.reason}"</div>
                                            <button
                                                onClick={() => handleAccept(req.id)}
                                                className="w-full bg-slate-900 text-white py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-pink-600 transition-colors"
                                            >
                                                Accept Task
                                            </button>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        ))}
                    </MapContainer>
                ) : (
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {requests.map(req => (
                            <div key={req.id} className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-3xl border border-pink-300/70 dark:border-slate-500 hover:shadow-lg transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                                        <FaUser />
                                    </div>
                                    <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        Pending
                                    </span>
                                </div>
                                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-1">{req.user?.name || "Request #" + req.id}</h3>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-1">{req.address}</p>

                                <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-600 dark:text-slate-400 italic">
                                    "{req.reason}"
                                </div>

                                <button
                                    onClick={() => handleAccept(req.id)}
                                    className="w-full py-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-pink-500 hover:to-rose-600 text-white rounded-xl font-bold uppercase text-xs tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 group-hover:scale-105"
                                >
                                    <FaCheck /> Accept Request
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NearbyRequests;
