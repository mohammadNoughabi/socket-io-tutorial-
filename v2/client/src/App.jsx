import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://10.145.173.71:3000");

export default function App() {
  const [message, setMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [room, setRoom] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", {
      message,
      room,
    });
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.on("recive_message", (data) => {
      setServerMessage(data);
    });
  }, [socket]);

  return (
    <div>
      <input
        type="text"
        placeholder="Room code ..."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join room</button>
      <br />
      <input
        type="text"
        placeholder="Message ..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send message</button>

      <h1>{serverMessage ? serverMessage.message : null}</h1>
    </div>
  );
}
