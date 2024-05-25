import { useNavigate } from "react-router-dom";
import Banner from "../banner";
import Navbar from "../Navbar";
import Slider from "../Slider";
import { AuthProvider } from "../auth";

import React from "react";
import CardTwo from "../CardTwo";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <AuthProvider>
        <Navbar />
        {/* <Banner /> */}
        <Slider />
        <CardTwo />

        {/* use the Link component and navigate function as needed */}
      </AuthProvider>
    </div>
  );
}
