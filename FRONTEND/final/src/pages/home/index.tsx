import { useNavigate } from "react-router-dom";
import Banner from "../banner";
import { Link } from "react-router-dom";
import Navbar from "../navbar";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/login");
  };

  const handleEditProfile = () => {
    // Redirect to the profile edit page
    navigate("/edit-profile");
  };

  return (
    <div>
      <Navbar />
      <Banner />
      <button onClick={handleLogout}>Logout</button>
      <br />
      <button onClick={handleEditProfile}>Edit Profile</button>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">
        <img src="/logo.png" alt="Register" />
      </Link>
    </div>
  );
}
