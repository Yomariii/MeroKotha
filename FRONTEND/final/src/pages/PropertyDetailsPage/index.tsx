import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Navbar from "../Navbar";
import { AuthProvider } from "../auth";

interface PropertyDetails {
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
  fullName: string;
  phoneNumber: string;
  imageUrls: string[];
  ratings: Rating[];
  latitude: number; // Add latitude
  longitude: number; // Add longitude
}

interface Rating {
  id: string;
  userId: string;
  ratingValue: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateRatingDto {
  userId: string;
  ratingValue: number;
}

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [propertyDetails, setPropertyDetails] =
    useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const averageRating = propertyDetails
    ? propertyDetails.ratings.reduce(
        (acc, rating) => acc + rating.ratingValue,
        0
      ) / propertyDetails.ratings.length
    : 0;

  const roundedAverageRating = Math.round(averageRating);

  const [newRating, setNewRating] = useState<CreateRatingDto>({
    userId: "", // replace with actual user ID
    ratingValue: 0,
  });

  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get<PropertyDetails>(
        `https://localhost:7154/api/rent/${id}`
      );
      console.log("Fetched property details:", response.data); // Add this line
      setPropertyDetails(response.data);
    } catch (error) {
      console.error("Error fetching property details:", error);
      setError("Failed to load property details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const handleRatingChange = async (newRatingValue: number) => {
    setNewRating({ ...newRating, ratingValue: newRatingValue });

    const userId = JSON.parse(localStorage.getItem("user") || "null");
    if (!userId) {
      console.error("No user ID found in localStorage");
      return;
    }

    const response = await fetch(
      `https://localhost:7154/api/rent/${id}/ratings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: userId,
          RatingValue: newRatingValue,
          Comment: "", // replace with the actual comment, if any
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to post rating");
      return;
    }

    const ratingDto = await response.json();
    // do something with ratingDto, e.g., update the state
  };

  if (loading) {
    return <p className="text-gray-600">Loading property details...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!propertyDetails) {
    return <p className="text-gray-600">Property details not found.</p>;
  }

  const center = {
    lat: propertyDetails.latitude,
    lng: propertyDetails.longitude,
  };

  return (
    <div>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <div className="carousel">
              {propertyDetails.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Property Image ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold">{propertyDetails.title}</h2>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <StarRatings
                    rating={newRating.ratingValue || 0}
                    starDimension="20px"
                    starSpacing="2px"
                    numberOfStars={5}
                    name="postRating"
                    starRatedColor="gold"
                    changeRating={handleRatingChange}
                  />
                </div>
                <span className="text-gray-600">
                  by {propertyDetails.fullName}
                </span>
              </div>
            </div>
            <p className="text-gray-700 mb-6">{propertyDetails.description}</p>
            <p className="text-2xl font-bold text-gray-800 mb-4">
              Rs.{propertyDetails.price.toLocaleString()}
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <i className="fas fa-home mr-4"></i>
                <p> Type: {propertyDetails.type}</p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt mr-4"></i>
                {/* <p>{propertyDetails.address}</p> */}
              </div>
              <div className="flex items-center">
                <i className="fas fa-calendar-alt mr-4"></i>
                <p>
                  Created:{" "}
                  {new Date(propertyDetails.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={() =>
                  window.alert("Phone number: " + propertyDetails.phoneNumber)
                }
              >
                Contact Us
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Message
              </button>
            </div>
            <div className="mt-8">
              <LoadScript googleMapsApiKey="AIzaSyDqN8-CkaJfj0r53POu6Q3cyFlWepbza3Y">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={13}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
