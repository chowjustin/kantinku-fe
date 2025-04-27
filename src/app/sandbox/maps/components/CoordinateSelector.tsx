"use client";
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const CoordinateSelector: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // ITS Surabaya coordinates
  const itsCoordinates = { lat: -7.2819, lng: 112.7975 };

  // Custom marker icon without shadow
  const createCustomIcon = () => {
    return L.icon({
      iconUrl: "/images/marker-icon.png",
      iconSize: [32, 35],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      // No shadowUrl property means no shadow will be displayed
    });
  };

  useEffect(() => {
    if (mapRef.current && !leafletMapRef.current) {
      // Make sure leaflet is only initialized once
      initMap();
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current) return;

    // Create the map centered at ITS Surabaya
    const map = L.map(mapRef.current).setView(
      [itsCoordinates.lat, itsCoordinates.lng],
      15,
    );

    // Add a custom map tile layer (Stamen Watercolor style)

    L.tileLayer(
      "https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=uuMcm9EL0bGLAFMaq8QDkiiLPjOPRgThwD63qsAWZoRNIj7EQiwBafjZ65ulsudH",
      {
        attribution:
          '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 15,
        maxZoom: 22,
      },
    ).addTo(map);

    leafletMapRef.current = map;

    // Add click event to the map
    map.on("click", (e: L.LeafletMouseEvent) => {
      const clickedLocation = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      setSelectedLocation(clickedLocation);

      // Update marker position
      if (markerRef.current) {
        markerRef.current.setLatLng(clickedLocation);
      } else {
        // Create a new marker if it doesn't exist
        const marker = L.marker(clickedLocation, {
          draggable: true,
          icon: createCustomIcon(),
        }).addTo(map);

        // Add dragend event to update coordinates when marker is dragged
        marker.on("dragend", () => {
          const position = marker.getLatLng();
          const newLocation = {
            lat: position.lat,
            lng: position.lng,
          };
          setSelectedLocation(newLocation);
        });

        markerRef.current = marker;
      }
    });

    // Add a marker for ITS Surabaya
    // L.marker([itsCoordinates.lat, itsCoordinates.lng], {
    //     icon: createCustomIcon()
    // })
    //     .addTo(map)
    //     .bindPopup('Sepuluh Nopember Institute of Technology (ITS), Surabaya')
    //     .openPopup();
  };

  const handleSendCoordinates = () => {
    if (selectedLocation) {
      // In a real application, you would send this to your backend
      console.log("Sending coordinates to backend:", selectedLocation);
      alert(
        `Coordinates (${selectedLocation.lat.toFixed(6)}, ${selectedLocation.lng.toFixed(6)}) sent to backend!`,
      );
    } else {
      alert("Please select a location on the map first.");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">Select a Location</h2>
      <div ref={mapRef} className="w-full h-96 rounded-lg shadow-md"></div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          {selectedLocation ? (
            <p>
              Selected: {selectedLocation.lat.toFixed(6)},{" "}
              {selectedLocation.lng.toFixed(6)}
            </p>
          ) : (
            <p>Click on the map to select a location</p>
          )}
        </div>
        <button
          onClick={handleSendCoordinates}
          disabled={!selectedLocation}
          className={`px-4 py-2 rounded-md ${
            selectedLocation
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Send Coordinates
        </button>
      </div>
    </div>
  );
};

export default CoordinateSelector;
