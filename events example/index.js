import { EventEmitter } from "events";

class Doorbell extends EventEmitter {
  press() {
    console.log("🔔 Button pressed!");
    this.emit("ring", { time: new Date().toLocaleTimeString() });
  }
}

const doorbell = new Doorbell();

// Listener 1: turn on the camera
doorbell.on("ring", (info) => {
  console.log(`[Camera] Recording started at ${info.time}`);
});

// Listener 2: send a notification to your phone
doorbell.on("ring", (info) => {
  console.log(`[Notification] "Someone's at the door" sent at ${info.time}`);
});

// Listener 3: only log the very first ring of the day
doorbell.once("ring", (info) => {
  console.log(`[Log] First ring today recorded at ${info.time}`);
});

doorbell.press(); // triggers all three listeners
doorbell.press(); // triggers only the first two — "once" listener already fired