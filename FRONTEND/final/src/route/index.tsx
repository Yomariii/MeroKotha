import LoginPage from "../pages/login";
import Home from "../pages/home";
import Register from "../pages/register";
import TermsAndPolicy from "../pages/termspolicy";
import AboutUs from "../pages/aboutus";
import ContactUs from "../pages/contactus";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
