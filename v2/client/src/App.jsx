import React, { useState, useEffect } from "react";
import { socket } from "./socket";

export default function App() {
  const [message, setMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [room, setRoom] = useState("");

  const sendMessage = () => {
    if (!message || !room) return;
    socket.emit("send_message", { message, room });
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    const onReceiveMessage = (data) => {
      setServerMessage(data);
    };

    socket.on("receive_message", onReceiveMessage);

    return () => {
      socket.off("receive_message", onReceiveMessage);
    };
  }, []);

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
