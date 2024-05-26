import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { AuthProvider } from "../auth";
import { toast } from "react-toastify";
import Itinerary from "../Itinerary";
import { useNavigate } from "react-router-dom";

interface Property {
  id: string;
  userId: string;
  title: string;
  description: string;
  address: string;
  price: number;
  type: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  ratings: Rating[];
  imageUrls: string[];
}

interface Rating {
  userId: string;
  ratingValue: number;
  comment: string;
}

const PropertyCrudPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<string>("Room");
  const [status, setStatus] = useState<number>(0);
  const [filterPrice, setFilterPrice] = useState<{ min: number; max: number }>({
    min: 0,
    max: Infinity,
  });
  const [filterType, setFilterType] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<number>(-1);
  const [role, setRole] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const statusMapping: Record<number, string> = {
    0: "Available",
    1: "Rented",
    2: "Under Maintenance",
    3: "Not Available",
    4: "Sold",
  };

  const navigate = useNavigate();

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

  const filteredProperties = properties.filter((property) => {
    const priceInRange =
      property.price >= filterPrice.min && property.price <= filterPrice.max;
    const typeMatches = filterType === "" || property.type === filterType;
    const statusMatches =
      filterStatus === -1 || property.status === filterStatus;
    return priceInRange && typeMatches && statusMatches;
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
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
      setImageUrls((prevUrls) => [...prevUrls, response.data.secure_url]);

      console.log("Image uploaded successfully:", response.data.secure_url);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleCreateProperty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("user")?.replace(/"/g, "") || "null";
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
        imageUrls,
      };

      await axios.post("https://localhost:7154/api/rent", propertyData);
      fetchProperties();

      toast.success("Property created successfully");

      // Reset form fields
      setTitle("");
      setDescription("");
      setPrice(0);
      setAddress("");
      setSelectedFile(null);
      setImageUrls([]);
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
          {role === "LANDLORD" && (
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
                      ref={fileInputRef}
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
                        property.userId ===
                        localStorage.getItem("user")?.replace(/"/g, "")
                    )
                    .map((property) => (
                      <li
                        key={property.id}
                        className="mb-4 p-4 border rounded shadow"
                        onClick={() => navigate(`/properties/${property.id}`)}
                      >
                        <div className="flex items-center mb-2">
                          <div>
                            <p className="font-semibold">{property.title}</p>
                            <p className="mb-2">{property.description}</p>
                            <p className="text-sm">Price: Rs{property.price}</p>
                            <p className="text-sm">
                              Address: {property.address}
                            </p>
                            <p className="text-sm">
                              Status: {statusMapping[property.status]}
                            </p>
                            <div className="flex flex-wrap">
                              {property.imageUrls.map((url, index) => (
                                <img
                                  key={index}
                                  src={url}
                                  alt={`Property ${index + 1}`}
                                  className="w-20 h-20 m-2"
                                />
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteProperty(property.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded ml-auto"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}
          {role === "TENANT" ? (
            <div className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="filterPrice">
                  Price Range:
                </label>
                <div className="flex">
                  <input
                    type="number"
                    id="filterPriceMin"
                    value={filterPrice.min}
                    onChange={(e) =>
                      setFilterPrice({
                        ...filterPrice,
                        min: Number(e.target.value),
                      })
                    }
                    className="w-1/2 px-3 py-2 border rounded mr-2"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    id="filterPriceMax"
                    value={filterPrice.max}
                    onChange={(e) =>
                      setFilterPrice({
                        ...filterPrice,
                        max: Number(e.target.value),
                      })
                    }
                    className="w-1/2 px-3 py-2 border rounded"
                    placeholder="Max"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="filterType">
                  Property Type:
                </label>
                <select
                  id="filterType"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">All Types</option>
                  <option value="Room">Room</option>
                  <option value="Flat">Flat</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Office">Office</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="filterStatus">
                  Status:
                </label>
                <select
                  id="filterStatus"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value={-1}>All Statuses</option>
                  {Object.entries(statusMapping).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : null}
          <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Properties</h2>
            <ul>
              {filteredProperties.map((property) => (
                <li
                  key={property.id}
                  className="mb-4 p-4 border rounded shadow"
                  onClick={() => navigate(`/properties/${property.id}`)}
                >
                  <div className="flex items-center mb-2">
                    <div>
                      <p className="font-semibold">{property.title}</p>
                      <p className="mb-2">{property.description}</p>
                      <p className="text-sm">Price: Rs{property.price}</p>
                      <p className="text-sm">Address: {property.address}</p>
                      <p className="text-sm">
                        Status: {statusMapping[property.status]}
                      </p>
                      <div className="flex flex-wrap">
                        {property.imageUrls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Property ${index + 1}`}
                            className="w-20 h-20 m-2"
                          />
                        ))}
                      </div>
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
