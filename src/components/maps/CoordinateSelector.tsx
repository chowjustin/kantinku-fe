"use client";
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface CoordinateSelectorProps {
  onCoordinateChange?: (
    coordinates: { lat: number; lng: number } | null,
  ) => void;
  defaultValue?: { lat: number; lng: number } | null;
}

const CoordinateSelector: React.FC<CoordinateSelectorProps> = ({
  onCoordinateChange,
  defaultValue,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(defaultValue || null);
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

  // Update parent form when location changes
  useEffect(() => {
    if (onCoordinateChange) {
      onCoordinateChange(selectedLocation);
    }
  }, [selectedLocation, onCoordinateChange]);

  // Initialize marker if defaultValue is provided
  useEffect(() => {
    if (defaultValue && leafletMapRef.current && !markerRef.current) {
      const map = leafletMapRef.current;
      const marker = L.marker([defaultValue.lat, defaultValue.lng], {
        draggable: true,
        icon: createCustomIcon(),
      }).addTo(map);

      marker.on("dragend", () => {
        const position = marker.getLatLng();
        const newLocation = {
          lat: position.lat,
          lng: position.lng,
        };
        setSelectedLocation(newLocation);
      });

      markerRef.current = marker;
      map.setView([defaultValue.lat, defaultValue.lng], 15);
    }
  }, [defaultValue, leafletMapRef.current]);

  const initMap = () => {
    if (!mapRef.current) return;

    // Create the map centered at ITS Surabaya
    const map = L.map(mapRef.current).setView(
      [itsCoordinates.lat, itsCoordinates.lng],
      15,
    );

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
  };

  return (
    <div className="flex flex-col space-y-4">
      <div ref={mapRef} className="w-full h-96 rounded-lg shadow-md"></div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          {selectedLocation ? (
            <p>
              Koordinat dipilih: {selectedLocation.lat.toFixed(6)},{" "}
              {selectedLocation.lng.toFixed(6)}
            </p>
          ) : (
            <p>Klik di peta untuk memilih lokasi</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoordinateSelector;
