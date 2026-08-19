import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import path from "node:path";

const app = express();
const httpServer = http.createServer(app);

const clientPath = path.join(process.cwd(), "../client/dist");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://10.145.173.149",
      "http://10.145.173.71"
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recive_message", data);
  });

  socket.on("join_room", (data) => {
    socket.join(data);
  });
});

httpServer.listen(3000, () => {
  console.log("server started on port 3000");
});
