// components/Map.tsx
"use client";
import { useEffect, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// Custom marker icons for different colors
const blueIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Debounce function
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Function to calculate the bearing between two points
const calculateBearing = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const deltaLon = toRadians(lon2 - lon1);
  const y = Math.sin(deltaLon) * Math.cos(toRadians(lat2));
  const x = Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) - Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(deltaLon);
  const bearing = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  return bearing.toFixed(2) + '°';
};

const Map = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    // Initialize the map
    const leafletMap = L.map('map').setView([51.505, -0.09], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(leafletMap);

    setMap(leafletMap);

    // Cleanup function to remove the map on component unmount
    return () => {
      leafletMap.remove();
    };
  }, []);

  // Fetch autocomplete suggestions from Nominatim API
  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]); // Clear suggestions if the query is too short
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Debounced version of fetchSuggestions
  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 150), []);

  // Handle search input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetchSuggestions(query); // Use the debounced function
  };

  // Handle selection of a suggestion
  const handleSuggestionClick = async (suggestion: any) => {
    if (!map) return;

    const { lat, lon, display_name } = suggestion;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add a marker for the searched location
    const searchedMarker = L.marker([parseFloat(lat), parseFloat(lon)], { icon: blueIcon })
      .addTo(map)
      .bindPopup(display_name)
      .openPopup();

    // Move the map to the searched location
    map.setView([parseFloat(lat), parseFloat(lon)], 13);

    // Add 5 random markers nearby
    const randomMarkers = [];
    for (let i = 0; i < 5; i++) {
      const randomLat = parseFloat(lat) + (Math.random() - 0.5) * 0.1;
      const randomLon = parseFloat(lon) + (Math.random() - 0.5) * 0.1;
      const randomMarker = L.marker([randomLat, randomLon], { icon: redIcon })
        .addTo(map)
        .bindPopup(`Random Location ${i + 1}`);
      randomMarkers.push({ lat: randomLat, lon: randomLon, marker: randomMarker });
    }

    // Calculate distance, time, and direction for each random marker
    for (const randomMarker of randomMarkers) {
      try {
        const response = await axios.get(
          `https://api.openrouteservice.org/v2/directions/foot-walking`,
          {
            params: {
              api_key: 'YOUR_OPENROUTESERVICE_API_KEY', // Replace with your API key
              start: `${lon},${lat}`,
              end: `${randomMarker.lon},${randomMarker.lat}`,
            },
          }
        );

        const { distance, duration } = response.data.features[0].properties;
        const bearing = calculateBearing(parseFloat(lat), parseFloat(lon), randomMarker.lat, randomMarker.lon);

        // Update the popup with distance, time, and direction
        randomMarker.marker
          .bindPopup(
            `Random Location<br>
            Distance: ${(distance / 1000).toFixed(2)} km<br>
            Time: ${(duration / 60).toFixed(2)} mins<br>
            Direction: ${bearing}`
          )
          .openPopup();
      } catch (error) {
        console.error('Error fetching route data:', error);
      }
    }

    // Clear suggestions
    setSuggestions([]);
    setSearchQuery('');
  };

  return (
    <div className="p-4 px-10">
      <div className="mb-2.5">
        <input
          type="text"
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {suggestions.length > 0 && (
          <ul className="list-none p-0 m-0 mt-2 border border-gray-200 rounded-md">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div id="map" className="h-[80vh] w-full" />
    </div>
  );
};

export default Map;