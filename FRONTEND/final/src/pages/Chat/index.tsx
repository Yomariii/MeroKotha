import React, { useEffect, useState } from "react";
import connection from "../signalrService"; // Path to your SignalR connection file

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const startConnection = async () => {
      try {
        await connection.start();
        console.log("SignalR Connected.");
        setConnected(true);

        connection.on(
          "ReceiveMessage",
          (sender: string, receiver: string, message: string) => {
            setMessages((messages) => [...messages, `${sender}: ${message}`]);
          }
        );
      } catch (err) {
        console.error("SignalR Connection Error: ", err);
        setTimeout(startConnection, 5000); // Retry connection every 5 seconds
      }
    };

    startConnection();

    return () => {
      connection.stop();
    };
  }, []);

  const joinChat = async (userName: string) => {
    if (connected) {
      try {
        await connection.invoke("JoinChat", userName);
        console.log(`Joined chat as ${userName}`);
      } catch (err) {
        console.error("SignalR Join Chat Error: ", err);
      }
    }
  };

  const sendMessage = async () => {
    if (connected) {
      try {
        await connection.invoke("SendMessage", "receiverUserName", message);
        setMessage("");
      } catch (err) {
        console.error("SignalR Send Message Error: ", err);
      }
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} disabled={!connected}>
        Send
      </button>
    </div>
  );
};

export default ChatComponent;
