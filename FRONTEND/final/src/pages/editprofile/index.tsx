import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { AuthProvider } from "../auth";

interface UserProfile {
  userName: string;
  email: string;
  createdOn: string;
  profilePictureUrl?: string;
  fullName: string; // Added fullName property
  phoneNumber: string; // Added phoneNumber property
  address: string; // Added address property
}

const EditProfile: React.FC = () => {
  const userId = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserProfile>({
    userName: "",
    email: "",
    createdOn: "",
    profilePictureUrl: "",
    fullName: "", // Added fullName property
    phoneNumber: "", // Added phoneNumber property
    address: "", // Added address property
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get<UserProfile>(
          `https://localhost:7154/api/v1/auth/${userId}`
        );
        console.log("Response data:", response.data);
        setProfile(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    } else {
      setError("User not logged in.");
      setLoading(false);
    }
  }, [userId]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7154/api/v1/auth/update-profile/${userId}`,
        formData
      );
      navigate("/profile");
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Handle error (e.g., show error message)
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <AuthProvider>
        <Navbar />
      </AuthProvider>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
        </div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleFormChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Email"
          />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleFormChange}
            className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Full Name"
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleFormChange}
            className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Phone Number"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleFormChange}
            className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Address"
          />
          <button
            type="submit"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
