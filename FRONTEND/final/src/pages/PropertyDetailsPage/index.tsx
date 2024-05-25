import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

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
  ratings: Rating[];
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

  //   useEffect(() => {
  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get<PropertyDetails>(
        `https://localhost:7154/api/rent/${id}`
      );
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

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRating({ ...newRating, ratingValue: Number(event.target.value) });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post(
        `https://localhost:7154/api/rent/${id}/ratings`,
        newRating
      );
      // Refresh property details to include new rating
      fetchPropertyDetails();
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const center = {
    lat: 37.7749,
    lng: -122.4194,
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

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <div className="carousel">
            {/* Add your image carousel component here */}
            <img
              src="https://images.unsplash.com/photo-1582647509711-c8aa8a8bda71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Property Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold">{propertyDetails.title}</h2>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <StarRatings
                  rating={roundedAverageRating}
                  starDimension="20px"
                  starSpacing="2px"
                  numberOfStars={5}
                  name="viewRating"
                  starRatedColor="gold"
                />

                <StarRatings
                  rating={newRating.ratingValue}
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
              <p>{propertyDetails.type}</p>
            </div>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt mr-4"></i>
              <p>{propertyDetails.address}</p>
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
              Contact Us
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Message
            </button>
          </div>
          <div className="mt-8">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
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
  );
}
