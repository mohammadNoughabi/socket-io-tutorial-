import http from "http";
import { WebSocketServer } from "ws";

// Instantiate HTTP server
const httpServer = http.createServer((req, res) => {
  console.log(`[HTTP] ${req.method} ${req.url}`);
  res.writeHead(200);
  res.end("Hello from HTTP");
});

// Listening on upgrade event on http server instance
httpServer.on("upgrade", (req) => {
  console.log("[HTTP] Upgrade requested:", req.headers.upgrade);
  console.log("[HTTP] Sec-WebSocket-Key:", req.headers["sec-websocket-key"]);
});

// Istantiate web socket server
const wss = new WebSocketServer({ server: httpServer });

// Listening on connection event of web socket server
wss.on("connection", (ws) => {
  console.log("[WS] Handshake complete — client connected");
  ws.on("message", (data) => {
    console.log("Message received on server:", data.toString());
    ws.send("Hello Client!");
  });
});

httpServer.listen(8080, () =>
  console.log("HTTP server listening on http://localhost:8080"),
);
