"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import Button from "@/components/buttons/Button";
import clsxm from "@/lib/clsxm";

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  departement: string;
}

interface LocationsModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  locations: Location[];
  title?: string;
}

const AlternateLocationsModal: React.FC<LocationsModalProps> = ({
  isOpen,
  setIsOpen,
  locations,
  title = "Saved Locations",
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  // We'll load Leaflet dynamically only when needed
  useEffect(() => {
    if (!isOpen) {
      setMapInitialized(false);
      return;
    }

    // Function to dynamically load leaflet and initialize map
    const loadMapLibraryAndInit = async () => {
      try {
        // Dynamically import Leaflet
        const L = (await import("leaflet")).default;
        // @ts-ignore
        await import("leaflet/dist/leaflet.css");

        if (!mapContainerRef.current) return;

        // Wait for modal to be fully rendered
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Initialize map
        const map = L.map(mapContainerRef.current, {
          fadeAnimation: false,
          zoomAnimation: false,
        }).setView([-7.2819, 112.7975], 15);

        const createCustomIcon = () => {
          return L.icon({
            iconUrl: "/images/marker-icon.png",
            iconSize: [32, 35],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            // No shadowUrl property means no shadow will be displayed
          });
        };

        L.tileLayer(
          "https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=uuMcm9EL0bGLAFMaq8QDkiiLPjOPRgThwD63qsAWZoRNIj7EQiwBafjZ65ulsudH",
          {
            attribution:
              '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 15,
            maxZoom: 22,
          },
        ).addTo(map);
        // Add markers
        const markers = locations.map((location) => {
          return L.marker([location.lat, location.lng], {
            icon: createCustomIcon(),
          })
            .addTo(map)
            .bindPopup(
              `<div><strong>${location.name}</strong><br>Lat: ${location.lat.toFixed(6)}<br>Lng: ${location.lng.toFixed(6)}</div>`,
            );
        });

        // Fit bounds
        if (locations.length > 0) {
          const bounds = L.latLngBounds(
            locations.map((loc) => [loc.lat, loc.lng]),
          );
          map.fitBounds(bounds);
        }

        // Force map to recalculate size
        setTimeout(() => {
          map.invalidateSize(true);
        }, 100);

        setMapInitialized(true);

        // Cleanup function
        return () => {
          map.remove();
        };
      } catch (err) {
        console.error("Error initializing map:", err);
      }
    };

    loadMapLibraryAndInit();
  }, [isOpen, locations]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-[9999]"
    >
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/20 pr-4 max-md:pl-4"
        style={{ zIndex: 9999 }}
      >
        <DialogPanel
          className={clsxm(
            "bg-white relative shadow-lg text-gray-900 rounded-lg p-6 w-3/4 max-h-[90vh] overflow-y-auto",
            "max-md:w-5/6 max-sm:w-full",
          )}
          style={{ zIndex: 10000 }}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X strokeWidth={2.5} size={20} />
          </button>

          <div className="flex flex-col space-y-4 mt-2">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{title}</h2>
            </div>

            <div
              ref={mapContainerRef}
              className="w-full h-96 rounded-lg shadow-md"
              style={{
                width: "100%",
                height: "24rem",
                position: "relative",
                zIndex: 100,
              }}
            >
              {!mapInitialized && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <p>Loading map...</p>
                </div>
              )}
            </div>

            <div className="">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold">{location.name}</h3>
                  <p className="text-sm text-gray-600">
                    Departemen {location.departement}
                  </p>
                  <p className="text-sm text-gray-600">
                    Lat: {location.lat.toFixed(6)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Lng: {location.lng.toFixed(6)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <Button type="button" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AlternateLocationsModal;
