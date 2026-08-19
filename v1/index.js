import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000" , "http://10.145.173.149"],
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`Client connected : ${socket.id}`);

  socket.on("message", (message) => {
    socket.emit("message", message);
    socket.broadcast.emit("message", message);
  });

  socket.on("typing", (socketId) => {
    console.log(`User with socket id ${socketId} is typing...`);
    socket.broadcast.emit("typing", socketId);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected : ${socket.id}`);
  });
});

httpServer.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
