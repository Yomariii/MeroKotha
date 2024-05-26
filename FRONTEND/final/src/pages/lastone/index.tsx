import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

interface PropertyDetail {
  icon: string;
  label: string;
}

interface Rating {
  id: string;
  userId: string;
  ratingValue: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface RentalPropertyDto {
  id: string;
  userId: string;
  userName: string;
  fullName: string;
  title: string;
  description: string;
  address: string;
  price: number;
  type: string;
  status: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  ratings: Rating[];
}

const LastTry: React.FC<{ id: string }> = ({ id }) => {
  const [property, setProperty] = useState<RentalPropertyDto | null>(null);

  useEffect(() => {
    axios
      .get<RentalPropertyDto>(`/api/rentalproperties/${id}`)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => {
        console.error("Error fetching property data:", error);
      });
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 37.7749, // Update this with property latitude
    lng: -122.4194, // Update this with property longitude
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <div className="carousel">
            {property.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Property Image ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold">{property.title}</h2>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                {[...Array(4)].map((_, index) => (
                  <span key={index} className="text-yellow-400">
                    <i className="fas fa-star"></i>
                  </span>
                ))}
                <span className="text-gray-400">
                  <i className="fas fa-star"></i>
                </span>
              </div>
              <span className="text-gray-600">by {property.fullName}</span>
            </div>
          </div>
          <p className="text-gray-700 mb-6">{property.description}</p>
          <p className="text-2xl font-bold text-gray-800 mb-4">
            ${property.price}
          </p>
          <div className="flex flex-col space-y-4">
            {/* Assuming you have a way to map property details to icons and labels
            {property.details.map((detail, index) => (
              <div key={index} className="flex items-center">
                <img src={detail.icon} alt="Icon" className="w-6 h-6 mr-4" />
                <p>{detail.label}</p>
              </div>
            ))} */}
          </div>
          <div className="flex mt-6">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
              Contact Us
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Message
            </button>
          </div>
          <div className="mt-8">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={13}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastTry;
