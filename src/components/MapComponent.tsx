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
  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 200), []);

  // Handle search input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetchSuggestions(query); // Use the debounced function
  };

  // Handle selection of a suggestion
  const handleSuggestionClick = (suggestion: any) => {
    if (!map) return;

    const { lat, lon, display_name } = suggestion;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add a marker for the searched location
    L.marker([parseFloat(lat), parseFloat(lon)], { icon: blueIcon })
      .addTo(map)
      .bindPopup(display_name)
      .openPopup();

    // Move the map to the searched location
    map.setView([parseFloat(lat), parseFloat(lon)], 13);

    // Add 4-5 random markers nearby
    for (let i = 0; i < 5; i++) {
      const randomLat = parseFloat(lat) + (Math.random() - 0.5) * 0.1;
      const randomLon = parseFloat(lon) + (Math.random() - 0.5) * 0.1;
      L.marker([randomLat, randomLon], { icon: redIcon })
        .addTo(map)
        .bindPopup(`Random Location ${i + 1}`);
    }

    // Clear suggestions
    setSuggestions([]);
    setSearchQuery('');
  };

  return (
    <div className='px-10'>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px' }}
        />
        {suggestions.length > 0 && (
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  backgroundColor: '#f9f9f9',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div id="map" style={{ height: '80vh', width: '100%' }} />
    </div>
  );
};

export default Map;