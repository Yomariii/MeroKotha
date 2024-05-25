import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

interface PropertyDetail {
  icon: string;
  label: string;
}

interface Property {
  id: string;
  userId: string;
  title: string;
  description: string;
  address: string;
  price: number;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  ratings: {
    id: string;
    userId: string;
    ratingValue: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

const PropertyDetails: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get<Property>(
          `/api/properties/${propertyId}`
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 37.7749,
    lng: -122.4194,
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <div className="carousel">
            {/* Add your image carousel component here */}
            <img
              src="https://images.unsplash.com/photo-1582647509711-c8aa8a8bda71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Property Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold">{property.title}</h2>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                {[
                  ...Array(
                    Math.floor(
                      property.ratings.reduce(
                        (acc, rating) => acc + rating.ratingValue,
                        0
                      ) / property.ratings.length
                    )
                  ),
                ].map((_, index) => (
                  <span key={index} className="text-yellow-400">
                    <i className="fas fa-star"></i>
                  </span>
                ))}
                {[
                  ...Array(
                    5 -
                      Math.floor(
                        property.ratings.reduce(
                          (acc, rating) => acc + rating.ratingValue,
                          0
                        ) / property.ratings.length
                      )
                  ),
                ].map((_, index) => (
                  <span key={index} className="text-gray-400">
                    <i className="fas fa-star"></i>
                  </span>
                ))}
              </div>
              <span className="text-gray-600">by John Doe</span>
            </div>
          </div>
          <p className="text-gray-700 mb-6">{property.description}</p>
          <p className="text-2xl font-bold text-gray-800 mb-4">
            ${property.price.toLocaleString()}
          </p>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <p>{property.address}</p>
            </div>
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

export default PropertyDetails;
