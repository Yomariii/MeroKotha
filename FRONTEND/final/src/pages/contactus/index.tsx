import React, { useState } from "react";
import Navbar from "../navbar";

const ContactUs: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission for demonstration purposes
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    // Reset form fields and show thank you message
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(true);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg mb-1">
                Name:
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg mb-1">
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-lg mb-1">
                Message:
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-lg text-center">
            Thank you for your message! We will get back to you soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
