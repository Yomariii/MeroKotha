import React, { useState, useEffect } from "react";
import axios from "axios";

function Card() {
  const [properties, setProperties] = useState<any[]>([]);

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

  const handleDeleteProperty = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7154/api/RentalProperty/${id}`);
      setProperties(properties.filter((property) => property.id !== id));
    } catch (error) {
      console.error("Error deleting property: ", error);
    }
  };

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
                {/* <button
                  onClick={() => handleDeleteProperty(property.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Card;
