import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface PropertyDetail {
  icon: string;
  label: string;
}

const PropertyDetails: React.FC = () => {
  const propertyDetails: PropertyDetail[] = [
    // {
    //   icon: "path/to/icon1.svg",
    //   label: "4 Bedrooms, 3 Bathrooms",
    // },
    // {
    //   icon: "path/to/icon2.svg",
    //   label: "2,500 sq. ft., Built in 2018",
    // },
    // {
    //   icon: "path/to/icon3.svg",
    //   label: "Downtown, Gym, Pool",
    // },
  ];

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 37.7749,
    lng: -122.4194,
  };

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
            <h2 className="text-3xl font-bold">Property Name</h2>
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
              <span className="text-gray-600">by John Doe</span>
            </div>
          </div>
          <p className="text-gray-700 mb-6">Property Description</p>
          <p className="text-2xl font-bold text-gray-800 mb-4">$500,000</p>
          <div className="flex flex-col space-y-4">
            {propertyDetails.map((detail, index) => (
              <div key={index} className="flex items-center">
                <img src={detail.icon} alt="Icon" className="w-6 h-6 mr-4" />
                <p>{detail.label}</p>
              </div>
            ))}
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
