import React, { useEffect, useState } from "react";
import axios from "axios";

const PropertyListings = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7154/api/RentalProperty/List"
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
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
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyListings;
