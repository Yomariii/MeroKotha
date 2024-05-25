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

const Profile: React.FC = () => {
  const userId = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get<UserProfile>(
          `https://localhost:7154/api/v1/auth/${userId}`
        );
        console.log("Response data:", response.data);
        setProfile(response.data);
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
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
          <h1 className="text-3xl font-bold">User Profile</h1>
        </div>
        {profile && (
          <div>
            <div className="flex items-center mb-4">
              <img
                src={
                  profile.profilePictureUrl ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Profile"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-2xl font-semibold">{profile.userName}</h2>
                <p className="text-gray-600">Email: {profile.email}</p>
                <p className="text-gray-600">Full Name: {profile.fullName}</p>
                <p className="text-gray-600">
                  Phone Number: {profile.phoneNumber}
                </p>
                <p className="text-gray-600">Address: {profile.address}</p>
                <p className="text-gray-600">
                  Created On: {new Date(profile.createdOn).toLocaleDateString()}
                </p>
                <div>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                    onClick={handleEditProfile}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
