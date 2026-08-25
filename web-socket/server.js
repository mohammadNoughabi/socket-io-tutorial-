import http from "http";
import { WebSocketServer } from "ws";

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Hello from HTTP");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", (data) => {
    console.log("Received:", data.toString());
    ws.send("Hello Client!");
  });
});

server.listen(8080);