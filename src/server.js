const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (e.g., from a build directory)
app.use(express.static("build"));

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("join room", (roomID) => {
    socket.join(roomID);
    console.log(`User ${socket.id} joined room ${roomID}`);

    // Notify others in the room about the new user
    const users = Array.from(io.sockets.adapter.rooms.get(roomID) || []);
    io.to(roomID).emit(
      "all users",
      users.filter((user) => user !== socket.id)
    );

    // Handle user leaving
    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
      io.to(roomID).emit("user left", socket.id);
    });
  });

  socket.on("sending signal", (payload) => {
    console.log(`User ${socket.id} sending signal to ${payload.userToSignal}`);
    io.to(payload.userToSignal).emit("receiving returned signal", {
      signal: payload.signal,
      from: socket.id,
    });
  });
});

// Serve index.html as the default file
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
