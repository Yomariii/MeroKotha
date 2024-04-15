import LoginPage from "../pages/login";
import Home from "../pages/home";
import Register from "../pages/register";
import TermsAndPolicy from "../pages/termspolicy";
import AboutUs from "../pages/aboutus";
import ContactUs from "../pages/contactus";
import PropertyCrudPage from "../pages/properties";
import PropertyListings from "../pages/propertylisting";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "../pages/profile";

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

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
