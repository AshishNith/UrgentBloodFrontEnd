"use client"; // Ensure this is at the top if using Next.js with client-side rendering

import React, { useState, useEffect } from "react";
import { FaLocationArrow, FaSpinner, FaMapMarkerAlt } from "react-icons/fa"; // Import icons from React Icons
import {Donors} from "./Donors"; // Import the Donors component

export default function CurrentLocation() {
  const [location, setLocation] = useState<string>("Fetching your location...");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Use a reverse geocoding API to get the location name
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
            .then((response) => response.json())
            .then((data) => {
              const locality = data.locality || "Unknown Locality";
              const countryName = data.countryName || "Unknown Country";
              setLocation(`${locality}, ${countryName}`);
            })
            .catch(() => {
              setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
            })
            .finally(() => setIsLoading(false));
        },
        () => {
          setLocation("Unable to retrieve your location.");
          setIsLoading(false);
        }
      );
    } else {
      setLocation("Geolocation is not supported by your browser.");
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-2 mb-6 relative">
      <h1 className="text-3xl font-bold text-center mb-8 pt-10 flex items-center justify-center gap-2">
        <FaLocationArrow className="text-blue-500" /> Donors Nearby You
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto text-center">
        <div className="flex items-center justify-center gap-2">
          {isLoading ? (
            <FaSpinner className="animate-spin text-blue-500" />
          ) : (
            <FaMapMarkerAlt className="text-red-500" />
          )}
          <p className="text-lg font-medium">
            {isLoading ? "Fetching your location..." : `Your location: ${location}`}
          </p>
        </div>
      </div>

      {/* Conditionally render the Donors component */}
      {!isLoading && <Donors location={location} />}
    </div>
  );
}