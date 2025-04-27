"use client";
import React from "react";
import dynamic from "next/dynamic";

// Import the components with dynamic loading (no SSR)
// This is necessary because Leaflet requires the window object
const MapPageContent = dynamic(
  () => import("@/app/sandbox/maps/components/MapPageContent"),
  {
    ssr: false,
  },
);

// Main page component
const MapPage: React.FC = () => {
  return <MapPageContent />;
};

export default MapPage;
