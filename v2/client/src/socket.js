import io from "socket.io-client";

const SOCKET_PORT = 3000;

console.log(window.location.hostname);

export const socket = io(`http://${window.location.hostname}:${SOCKET_PORT}`);
