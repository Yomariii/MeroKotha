// AdminControls.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../adminnavbar";

interface User {
  id: string;
  userName: string;
  email: string;
  lockedUntil?: string;
}

const AdminControls: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>(
          "https://localhost:7154/api/usermgm/all"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const handleBanUser = async (id: string, banDate?: Date) => {
    try {
      const formattedDate = banDate ? new Date(banDate).toISOString() : "";
      const response = await axios.put(
        `/api/usermgm/ban/${id}${formattedDate ? `/${formattedDate}` : ""}`
      );
      console.log(response.data);
      // Refresh user list after banning
      const updatedUsers = await axios.get<User[]>("/api/usermgm/all");
      setUsers(updatedUsers.data);
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const handleUnbanUser = async (id: string) => {
    try {
      const response = await axios.put(`/api/usermgm/unban/${id}`);
      console.log(response.data);
      // Refresh user list after unbanning
      const updatedUsers = await axios.get<User[]>("/api/usermgm/all");
      setUsers(updatedUsers.data);
    } catch (error) {
      console.error("Error unbanning user:", error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7154/api/usermgm/${id}`);
      // Refresh the user list after deletion
      const response = await axios.get<User[]>(
        "https://localhost:7154/api/usermgm/all"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">User Management</h1>
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between bg-white shadow-md rounded-lg px-6 py-3"
            >
              <div>
                <h2 className="text-lg font-semibold">{user.userName}</h2>
                <p className="text-gray-600">{user.email}</p>
                {user.lockedUntil && (
                  <p className="text-sm text-red-600">
                    Locked until: {user.lockedUntil}
                  </p>
                )}
              </div>
              <div>
                {user.lockedUntil ? (
                  <button
                    onClick={() => handleUnbanUser(user.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none mr-2"
                  >
                    Unban
                  </button>
                ) : (
                  <div className="flex">
                    <button
                      onClick={() => handleBanUser(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none mr-2"
                    >
                      Ban
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminControls;
