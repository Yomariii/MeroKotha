import Banner from "../Banner";
import Navbar from "../navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner/>
      <a href="/login">Login</a>
      <br></br>
      <a href="/register">Register</a>
    </div>
  );
}
