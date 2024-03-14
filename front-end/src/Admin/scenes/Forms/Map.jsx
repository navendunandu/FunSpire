import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const Map = () => {
  const [position, setPosition] = useState([0, 0]); // Default position

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} />
    </MapContainer>
  );
};

export default Map;
