import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"]
    }
});

export default io;