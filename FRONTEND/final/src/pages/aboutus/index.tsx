import React from "react";
import Navbar from "../navbar";

const AboutUs: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-lg mb-4">
              At [Company Name], our vision is to [describe your vision or
              goals]. We strive to [explain how you aim to achieve your vision].
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <ul className="list-disc list-inside">
              <li className="text-lg mb-2">
                Quality: We are committed to delivering high-quality
                products/services.
              </li>
              <li className="text-lg mb-2">
                Innovation: We embrace innovation and continuously seek
                improvement.
              </li>
              <li className="text-lg mb-2">
                Customer Satisfaction: We prioritize customer satisfaction and
                strive to exceed expectations.
              </li>
              <li className="text-lg mb-2">
                Integrity: We conduct business with honesty, transparency, and
                ethical practices.
              </li>
              <li className="text-lg mb-2">
                Collaboration: We foster a collaborative and inclusive work
                environment.
              </li>
            </ul>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Our Team</h3>
            <p className="text-lg mb-4">
              Our team consists of talented professionals with diverse
              backgrounds and expertise. We believe in the power of teamwork and
              collaboration to achieve great results.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
            <p className="text-lg mb-4">
              If you have any questions or would like to learn more about our
              company, feel free to reach out to us at [contact information].
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
