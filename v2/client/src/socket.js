import io from "socket.io-client";

export const socket = io(window.location.origin);
