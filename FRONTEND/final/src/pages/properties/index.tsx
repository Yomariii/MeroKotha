import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar";

const PropertyCrudPage: React.FC = () => {
  const [properties, setProperties] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

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
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
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
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </form>
          </div>
          <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Properties List</h2>
            <ul>
              {properties.map((property: any) => (
                <li
                  key={property.id}
                  className="mb-4 p-4 border rounded shadow"
                >
                  <p className="font-semibold">{property.name}</p>
                  <p className="mb-2">{property.description}</p>
                  <p className="mb-2">{property.price}</p>
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
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
