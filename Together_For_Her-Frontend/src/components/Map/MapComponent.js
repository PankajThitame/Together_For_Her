import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const MapComponent = ({ center, zoom }) => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={center} />
    </MapContainer>
  );
};

export default MapComponent;
