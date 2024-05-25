import React from "react";

interface PropertyDetail {
  icon: string;
  label: string;
}

const PropertyDetails: React.FC = () => {
  const propertyDetails: PropertyDetail[] = [
    {
      icon: "path/to/icon1.svg",
      label: "Detail 1 (e.g., Bedrooms, Bathrooms)",
    },
    {
      icon: "path/to/icon2.svg",
      label: "Detail 2 (e.g., Square Footage, Year Built)",
    },
    {
      icon: "path/to/icon3.svg",
      label: "Detail 3 (e.g., Location, Amenities)",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src="path/to/your/property/image.jpg"
            alt="Property Image"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Property Name</h2>
          <p className="text-gray-700 mb-6">Property Description</p>
          <div className="flex flex-col space-y-4">
            {propertyDetails.map((detail, index) => (
              <div key={index} className="flex items-center">
                <img src={detail.icon} alt="Icon" className="w-6 h-6 mr-4" />
                <p>{detail.label}</p>
              </div>
            ))}
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
            Contact Us
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
