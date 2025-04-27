"use client";
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LocationsDisplay: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // ITS Surabaya coordinates
  const itsCoordinates = { lat: -7.2819, lng: 112.7975 };

  // Dummy data (simulating backend response)
  const dummyLocations = [
    { id: 1, name: "ITS Main Gate", lat: -7.2819, lng: 112.7975 },
    { id: 2, name: "ITS Library", lat: -7.2798, lng: 112.7943 },
    {
      id: 3,
      name: "ITS Department of Informatics",
      lat: -7.2793,
      lng: 112.7971,
    },
    { id: 4, name: "ITS Auditorium", lat: -7.2834, lng: 112.7956 },
  ];

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

    // Create the map
    const map = L.map(mapRef.current).setView(
      [itsCoordinates.lat, itsCoordinates.lng],
      15,
    );

    // Add a custom map tile layer
    // Here's a dark theme map using Jawg Maps
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

    // Clear any existing markers
    markersRef.current.forEach((marker) => map.removeLayer(marker));
    markersRef.current = [];

    // Add markers for each location
    dummyLocations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: createCustomIcon(),
      })
        .addTo(map)
        .bindPopup(
          `<div><strong>${location.name}</strong><br>Lat: ${location.lat.toFixed(6)}<br>Lng: ${location.lng.toFixed(6)}</div>`,
        );

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    const bounds = L.latLngBounds(
      dummyLocations.map((loc) => [loc.lat, loc.lng]),
    );
    map.fitBounds(bounds);
  };

  // Function to fetch locations from backend (in a real application)
  const fetchLocations = () => {
    // In a real app, you would make an API call here
    console.log("Fetching locations from backend...");
    // For now, we're using our dummy data
    alert("Refreshed with dummy data (check console)");
    console.log("Locations data:", dummyLocations);

    // Re-initialize map with the (potentially new) data
    initMap();
  };

  return (
    <div className="flex flex-col space-y-4 mt-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Saved Locations</h2>
        <button
          onClick={fetchLocations}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
        >
          Refresh Locations
        </button>
      </div>

      <div ref={mapRef} className="w-full h-96 rounded-lg shadow-md"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dummyLocations.map((location) => (
          <div
            key={location.id}
            className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold">{location.name}</h3>
            <p className="text-sm text-gray-600">
              Lat: {location.lat.toFixed(6)}
            </p>
            <p className="text-sm text-gray-600">
              Lng: {location.lng.toFixed(6)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsDisplay;
