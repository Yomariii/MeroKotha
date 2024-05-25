import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { AuthProvider } from "../auth";
import { toast } from "react-toastify";
import Itinerary from "../Itinerary";

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
  ratings: Rating[];
}

interface Rating {
  userId: string;
  ratingValue: number;
  comment: string;
}

export default function PropertyCrudPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("Room");
  const [status, setStatus] = useState<number>(0); // Assuming 0 is the default status for new properties

  const statusMapping = {
    0: "Available",
    1: "Rented",
    2: "Under Maintenance",
    3: "Not Available",
    4: "Sold",
  };

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
    }
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        alert("Please select an image to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "ml_default");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfugeey12/image/upload",
        formData
      );

      setImageUrl(response.data.secure_url);
      console.log("Image uploaded successfully:", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get<Property[]>(
        "https://localhost:7154/api/rent"
      );
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties: ", error);
    }
  };

  const handleCreateProperty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("user") || "null";
      if (!userId) {
        console.error("No user ID found in local storage.");
        return;
      }
      const propertyData = {
        userId,
        title,
        description,
        address,
        price,
        type: propertyType,
        status,
        imageUrl,
      };
      await axios.post("https://localhost:7154/api/rent", propertyData);
      fetchProperties();
      toast.success("Property created successfully");
      setTitle("");
      setDescription("");
      setPrice(0);
      setAddress("");
      setSelectedFile(null);
      setImageUrl("");
    } catch (error) {
      console.error("Error creating property: ", error);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7154/api/rent/${id}`);
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property: ", error);
    }
  };

  return (
    <div>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mt-8 mb-4">
          Manage Rental Properties
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {role === "LANDLORD" ? (
            <>
              <div className="p-4 border rounded shadow">
                <h2 className="text-xl font-semibold mb-4">
                  Create New Property
                </h2>
                <form onSubmit={handleCreateProperty}>
                  <div className="mb-4">
                    <label className="block mb-2" htmlFor="title">
                      Title:
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2" htmlFor="description">
                      Description:
                    </label>
                    <input
                      type="text"
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
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2" htmlFor="address">
                      Address:
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <Itinerary />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2" htmlFor="propertyType">
                      Property Type:
                    </label>
                    <select
                      id="propertyType"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="Room">Room</option>
                      <option value="Flat">Flat</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Office">Office</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2" htmlFor="status">
                      Status:
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded"
                    >
                      {Object.entries(statusMapping).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2" htmlFor="imageUrl">
                      Image:
                    </label>
                    <input
                      type="file"
                      id="imageUrl"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <button
                      type="button"
                      onClick={handleUpload}
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    >
                      Upload
                    </button>
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
                  {properties
                    .filter(
                      (property) =>
                        property.userId === localStorage.getItem("user")
                    )
                    .map((property) => (
                      <li
                        key={property.id}
                        className="mb-4 p-4 border rounded shadow"
                      >
                        <div className="flex items-center mb-2">
                          <img
                            // src={
                            //   property.imageUrl ||
                            //   "https://via.placeholder.com/150"
                            // }
                            alt={property.title}
                            className="w-12 h-12 object-cover rounded-full mr-4"
                          />
                          <div>
                            <p className="font-semibold">{property.title}</p>
                            <p className="mb-2">{property.description}</p>
                            <p className="mb-2">${property.price}</p>
                            <p className="mb-2">{property.address}</p>
                            <p className="mb-2">
                              Status: {statusMapping[property.status]}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
