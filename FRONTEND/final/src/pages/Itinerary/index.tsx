import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
type Location = {
  name: string;
  location: google.maps.LatLng;
};
export default function Itinerary() {
  const apiKey = "AIzaSyDqN8-CkaJfj0r53POu6Q3cyFlWepbza3Y";
  // State to store selected locations
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);

  // Function to handle marker click event
  const handleMarkerClick = (location: google.maps.LatLng) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: location }, (results, status) => {
      if (status === "OK") {
        if (results && results[0]) {
          const name = results[0].formatted_address;
          // setSelectedLocations([...selectedLocations, { name, location }]);
          setSelectedLocations([{ name, location }]);
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  return (
    <div className="flex">
      <div className="w-2/5 h-auto overflow-auto border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Choose Your Location</h2>
        <ul>
          {selectedLocations.map((loc, index) => (
            <li key={index}>
              {loc.name} - {loc.location.lat()}, {loc.location.lng()}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/5">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{ lat: 27.7, lng: 85.3 }}
            zoom={14}
            onClick={(event) => {
              if (event.latLng) {
                handleMarkerClick(event.latLng);
              }
            }}
          >
            {selectedLocations.map((loc, index) => (
              <Marker
                key={index}
                position={{ lat: loc.location.lat(), lng: loc.location.lng() }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
