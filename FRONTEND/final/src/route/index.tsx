import React, { useEffect } from "react";
import LoginPage from "../pages/login";
import Home from "../pages/home";
import Register from "../pages/register";
import TermsAndPolicy from "../pages/termspolicy";
import AboutUs from "../pages/aboutus";
import ContactUs from "../pages/contactus";
import PropertyCrudPage from "../pages/properties";
import PropertyListings from "../pages/propertylisting";
import Itinerary from "../pages/Itinerary";
import AdminControls from "../pages/AdminControl";
import Profile from "../pages/profile";
import PropertyDetails from "../pages/PropertyDetails";
import ContactMessage from "../pages/Complains";
import EditProfile from "../pages/editprofile";
import Test from "../pages/test";
import PropertyDetailsPage from "../pages/PropertyDetailsPage";
import Chat from "../pages/Chat";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  useNavigate,
} from "react-router-dom";
import ProfilePage from "../pages/profile";

const PropertyDetailsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <PropertyDetails propertyId={id!} />;
};

const AdminControlsRoute: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role") !== "Admin") {
      navigate("/");
      window.alert("You are not authorized to access this page.");
    }
  }, [navigate]);

  if (localStorage.getItem("role") !== "Admin") {
    return null;
  }

  return <AdminControls />;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/termsandpolicy" element={<TermsAndPolicy />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/properties" element={<PropertyCrudPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/propertylistings" element={<PropertyListings />} />
        <Route path="/Itinerary" element={<Itinerary />} />
        <Route path="/AdminControls" element={<AdminControls />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/rentalproperty/:id"
          element={<PropertyDetailsWrapper />}
        />

        <Route path="/complians" element={<ContactMessage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/test" element={<Test />} />
        <Route path="/properties/:id" element={<PropertyDetailsPage />} />
        <Route path="/chat" element={<Chat />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
