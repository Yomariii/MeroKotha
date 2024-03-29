import React, { useState } from "react";
import axios from "axios";
import Navbar from "../navbar";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("LANDLORD");

  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiBaseUrl = "https://localhost:7154"; // Update with your backend URL
      const registerEndpoint = "/api/v1/auth/register";

      const response = await axios.post(apiBaseUrl + registerEndpoint, {
        email,
        username,
        password,
        confirmPassword,
        fullName,
        phoneNumber,
        address,
        role,
      });

      // Handle the registration success response here
      console.log("Registration Success:", response.data);

      // Redirect to the login page or dashboard after successful registration
      window.location.href = "/login"; // Example redirection to the login page
    } catch (error) {
      console.error("Error During Registration:", error);
      setRegistrationError("Registration failed. Please try again."); // Handle registration error
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {registrationError && <p>{registrationError}</p>}
          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              required
              autoComplete="username" // Add autocomplete attribute
            />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              required
              autoComplete="new-password" // Add autocomplete attribute
            />
          </div>
          <div>
            <label className="block mb-1">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              required
              autoComplete="new-password" // Add autocomplete attribute
            />
          </div>
          <div>
            <label className="block mb-1">Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Phone Number:</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className={`w-1/2 py-2 rounded-md ${
                role === "LANDLORD"
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
              onClick={() => setRole("LANDLORD")}
            >
              Landlord
            </button>
            <button
              type="button"
              className={`w-1/2 py-2 rounded-md ${
                role === "TENANT"
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
              onClick={() => setRole("TENANT")}
            >
              Tenant
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
