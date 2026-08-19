import express from "express";
import http from "node:http";
import fs from "node:fs";
import { Server } from "socket.io";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientPath = path.join(__dirname, "../client/dist");
const PORT = 3000;

const isLocalNetworkOrigin = (origin) =>
  /^https?:\/\/(localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+)(:\d+)?$/.test(
    origin
  );

const corsOptions = {
  origin(origin, callback) {
    if (!origin || isLocalNetworkOrigin(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
};

const app = express();
const httpServer = http.createServer(app);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (fs.existsSync(clientPath)) {
  app.use(express.static(clientPath));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      message: "Socket.IO server is running. Open the Vite dev server for the frontend.",
    });
  });
}

const io = new Server(httpServer, { cors: corsOptions });

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    io.to(data.room).emit("recive_message", data);
  });

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on http://0.0.0.0:${PORT}`);
  console.log("Accessible on your local network via your machine IP");
});
