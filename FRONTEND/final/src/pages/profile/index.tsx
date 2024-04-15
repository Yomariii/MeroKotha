import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const apiBaseUrl = "https://localhost:7154";
          const ProfileEndpoint = "/api/v1/profile"; // Adjust the endpoint as per your API

          const response = await axios.get(apiBaseUrl + ProfileEndpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error Fetching Profile Data - ", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Welcome to Your Profile</h1>
      <div>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        {/* Add more profile data as needed */}
      </div>
    </div>
  );
};

export default ProfilePage;
