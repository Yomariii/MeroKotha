import React, { useState, useEffect } from "react";
import axios from "axios";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  creationTime: string; // Add creationTime property
}

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get<ContactMessage[]>(
          "https://localhost:7154/api/contact"
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>
      <div className="grid grid-cols-1 gap-4">
        {messages.map((message) => (
          <div key={message._id} className="bg-white shadow-md rounded p-4">
            <p className="font-semibold">Name: {message.name}</p>
            <p>Email: {message.email}</p>
            <p>Message: {message.message}</p>
            <p>
              Creation Time: {new Date(message.creationTime).toLocaleString()}
            </p>{" "}
            {/* Display creation time */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactMessages;
