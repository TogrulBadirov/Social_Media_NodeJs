import app from "./app.js";
import { Server } from "socket.io";
import http from "http";
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT;


io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  server.on("error", (err) => {
    console.error("Server failed to start:", err);
  });
  
  server.on("listening", () => {
    console.log("Server is now listening");
  });