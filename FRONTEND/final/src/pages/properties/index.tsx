import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar";
import {
  LoadScript,
  GoogleMap,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const PropertyCrudPage: React.FC = () => {
  const [properties, setProperties] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(null); // State to store selected place

  const mapStyles = {
    height: "50vh",
    width: "100%",
  };

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      let place = autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        let location = place.geometry.location;
        setSelectedPlace({ lat: location.lat(), lng: location.lng() });
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const [defaultCenter, setDefaultCenter] = useState({
    lat: 27.700769,
    lng: 85.30014,
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7154/api/RentalProperty/List"
      );
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties: ", error);
    }
  };

  const handleCreateProperty = async () => {
    try {
      await axios.post("https://localhost:7154/api/RentalProperty/Creation", {
        name: name,
        description: description,
        price: price,
        latitude: defaultCenter.lat,
        longitude: defaultCenter.lng,
      });
      fetchProperties();
      // Clear form inputs after successful creation
      setName("");
      setDescription("");
      setPrice(0);
    } catch (error) {
      console.error("Error creating property: ", error);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7154/api/RentalProperty/${id}`);
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property: ", error);
    }
  };

  return (
    <div className="p-4">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mt-8 mb-4">
          Manage Rental Properties
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Create New Property</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateProperty();
              }}
            >
              <div className="mb-4">
                <label className="block mb-2" htmlFor="name">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="description">
                  Description:
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="price">
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <LoadScript
                  googleMapsApiKey="AIzaSyB1o6-3uZwjEypw8203VsReL1i0npeUO_g"
                  libraries={["places"]}
                >
                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    center={selectedPlace || defaultCenter} // Use selectedPlace if available, else use defaultCenter
                    zoom={15}
                  >
                    {selectedPlace && (
                      <Marker position={selectedPlace} /> // Show marker at selected place's location
                    )}
                    <StandaloneSearchBox
                      onLoad={onLoad}
                      onPlacesChanged={onPlaceChanged}
                    >
                      <input
                        type="text"
                        placeholder="Search location"
                        style={{
                          boxSizing: `border-box`,
                          border: `1px solid transparent`,
                          width: `240px`,
                          height: `32px`,
                          padding: `0 12px`,
                          borderRadius: `3px`,
                          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                          fontSize: `14px`,
                          outline: `none`,
                          textOverflow: `ellipses`,
                          position: "absolute",
                          left: "50%",
                          marginLeft: "-120px",
                        }}
                      />
                    </StandaloneSearchBox>
                  </GoogleMap>
                </LoadScript>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </form>
          </div>
          <div className="h-full p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Properties List</h2>
            <ul className="space-y-5">
              {properties.map((property: any) => (
                <li key={property.id} className="card p-4">
                  <div className="card-img"></div>
                  <div className="card-info">
                    <p className="text-title">{property.name}</p>
                    <p className="text-body">{property.description}</p>
                  </div>
                  <div className="card-footer">
                    <span className="text-title">{property.price}</span>
                    <div className="card-button">
                      <svg className="svg-icon w-3 h-3" viewBox="0 0 5 5">
                        {/* SVG paths */}
                      </svg>
                      <button
                        onClick={() => handleDeleteProperty(property.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCrudPage;
