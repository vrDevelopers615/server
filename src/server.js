// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin:
      "https://66d5766942358dc85e36b151--lighthearted-sherbet-33c07d.netlify.app/", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

// Enable CORS for your frontend
app.use(
  cors({
    origin:
      "https://66d5766942358dc85e36b151--lighthearted-sherbet-33c07d.netlify.app/", // Replace with your Netlify URL
    methods: ["GET", "POST"],
  })
);

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("join room", (roomID) => {
    socket.join(roomID);
    console.log(`User ${socket.id} joined room ${roomID}`);

    const users = Array.from(io.sockets.adapter.rooms.get(roomID) || []);
    io.to(roomID).emit(
      "all users",
      users.filter((user) => user !== socket.id)
    );

    socket.on("sending signal", (payload) => {
      io.to(payload.userToSignal).emit("receiving returned signal", {
        signal: payload.signal,
        from: socket.id,
      });
    });

    socket.on("returning signal", (payload) => {
      io.to(payload.callerID).emit("receiving returned signal", {
        signal: payload.signal,
        from: socket.id,
      });
    });

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
      io.to(roomID).emit("user left", socket.id);
    });
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
