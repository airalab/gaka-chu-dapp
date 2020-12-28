import io from "socket.io-client";
import config from "~config";

class Socket {
  constructor() {
    this.isReady = false;
    this.connection = false;
    this.socket = io(config.AUCTION_API);
    this.socket.on("connect_error", () => {
      this.connection = false;
    });
    this.socket.on("error", function(error) {
      console.warn(error);
    });
    this.init().then(() => {
      this.isReady = true;
    });
  }

  init() {
    return new Promise((resolve) => {
      this.socket.on("connect", () => {
        console.log("connect");
        this.connection = true;
        resolve();
      });
    });
  }

  ready() {
    return new Promise((resolve) => {
      const t = setInterval(() => {
        if (this.isReady) {
          resolve();
          clearInterval(t);
        }
      }, 100);
    });
  }

  on(topic, cb) {
    this.socket.on(topic, cb);
  }
}

export default new Socket();
