import "./App.css";

import SocketClient from "./core/network/SocketClient";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    SocketClient.initializeSocket();
  }, []);

  useEffect(() => {
    SocketClient.on("received_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const handleSendMessage = () => {
    SocketClient.emit("send_message", message);
    setMessage("");
  };

  return (
    <div className="App">
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        placeholder="Ecrire un message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>ENVOYER</button>
    </div>
  );
}

export default App;
