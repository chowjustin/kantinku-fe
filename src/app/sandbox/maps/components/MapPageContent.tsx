"use client";
import React from "react";
import CoordinateSelector from "../../../../components/maps/CoordinateSelector";
import LocationsDisplay from "../../../../components/maps/LocationsDisplay";

const MapPageContent: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Map Integration - ITS Surabaya
      </h1>

      {/* Coordinate Selector Map */}
      <CoordinateSelector />

      {/* Divider */}
      <div className="border-b border-gray-200 my-8"></div>

      {/* Locations Display Map */}
      <LocationsDisplay />
    </div>
  );
};

export default MapPageContent;
