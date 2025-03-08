// components/Map.tsx
"use client";
import { useEffect, useState, useCallback, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
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

interface Suggestion {
  lat: string;
  lon: string;
  display_name: string;
}

const Map = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);

  useEffect(() => {
    // Initialize the map
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const leafletMap = L.map(mapContainer).setView([51.505, -0.09], 13);

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

  // Debounced fetchSuggestions function
  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 3) return; // Only search if the query has at least 3 characters

    try {
      const response = await axios.get<Suggestion[]>(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, []);

  // Handle search input change with debounce
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const debounceTimer = setTimeout(() => fetchSuggestions(query), 300);
    return () => clearTimeout(debounceTimer);
  }, [fetchSuggestions]);

  // Calculate route using Leaflet Routing Machine
  const calculateRoute = useCallback((start: L.LatLng, end: L.LatLng) => {
    if (!map) return;

    const route = L.Routing.control({
      waypoints: [start, end],
      routeWhileDragging: false,
      show: false, // Hide the default route instructions
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
      }),
    }).addTo(map);

    route.on('routesfound', (e) => {
      const { routes: foundRoutes } = e;
      if (foundRoutes && foundRoutes.length > 0) {
        const { distance, time } = foundRoutes[0].summary;
        setRoutes((prev) => [
          ...prev,
          {
            start: start,
            end: end,
            distance: (distance / 1000).toFixed(2) + ' km', // Convert to km
            time: (time / 60).toFixed(2) + ' mins', // Convert to minutes
          },
        ]);
      }
    });
  }, [map]);

  // Handle selection of a suggestion
  const handleSuggestionClick = useCallback((suggestion: Suggestion) => {
    if (!map) return;

    const { lat, lon, display_name } = suggestion;
    const startLatLng = L.latLng(parseFloat(lat), parseFloat(lon));

    // Clear existing markers and routes
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Routing.Control) {
        map.removeLayer(layer);
      }
    });

    // Add a marker for the searched location
    L.marker(startLatLng, { icon: blueIcon })
      .addTo(map)
      .bindPopup(display_name)
      .openPopup();

    // Move the map to the searched location
    map.setView(startLatLng, 13);

    // Add 5 random markers nearby and calculate routes
    setRoutes([]); // Clear previous routes
    for (let i = 0; i < 5; i++) {
      const randomLat = parseFloat(lat) + (Math.random() - 0.5) * 0.1;
      const randomLon = parseFloat(lon) + (Math.random() - 0.5) * 0.1;
      const randomLatLng = L.latLng(randomLat, randomLon);

      L.marker(randomLatLng, { icon: redIcon })
        .addTo(map)
        .bindPopup(`Random Location ${i + 1}`);

      // Calculate route from searched location to random marker
      calculateRoute(startLatLng, randomLatLng);
    }

    // Clear suggestions
    setSuggestions([]);
    setSearchQuery('');
  }, [map, calculateRoute]);

  const suggestionList = useMemo(() => (
    <ul style={{ 
      listStyleType: 'none', 
      padding: 0, 
      margin: 0, 
      maxHeight: '200px', 
      overflowY: 'auto', 
      border: '1px solid #ddd', 
      borderRadius: '4px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
      backgroundColor: '#fff', 
      position: 'absolute', 
      width: '100%', 
      zIndex: 1000 
    }}>
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => handleSuggestionClick(suggestion)}
          style={{
            padding: '10px',
            cursor: 'pointer',
            backgroundColor: '#f9f9f9',
            borderBottom: '1px solid #ddd',
            transition: 'background-color 0.2s',
            ':hover': {
              backgroundColor: '#e9e9e9',
            }
          }}
        >
          {suggestion.display_name}
        </li>
      ))}
    </ul>
  ), [suggestions, handleSuggestionClick]);

  return (
    <div>
      <div style={{ 
        marginBottom: '20px', 
        position: 'relative', 
        maxWidth: '600px', 
        marginLeft: 'auto', 
        marginRight: 'auto' 
      }}>
        <input
          type="text"
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={handleInputChange}
          style={{ 
            width: '100%', 
            padding: '12px', 
            fontSize: '16px', 
            border: '1px solid #ddd', 
            borderRadius: '4px', 
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
            outline: 'none', 
            transition: 'border-color 0.2s, box-shadow 0.2s', 
            ':focus': {
              borderColor: '#007bff', 
              boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.25)', 
            }
          }}
        />
        {suggestions.length > 0 && suggestionList}
      </div>
      <div id="map" style={{ height: '80vh', width: '100%' }} />
      {routes.length > 0 && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
          <h3>Routes to Random Donors</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {routes.map((route, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <strong>Route {index + 1}:</strong> Distance: {route.distance}, Time: {route.time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Map;