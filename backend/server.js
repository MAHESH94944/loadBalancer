const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const LoadBalancer = require("./loadBalancer");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const loadBalancer = new LoadBalancer(3); 

app.use(express.static("../frontend")); 

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("assignTask", (task) => {
    const assignedServer = loadBalancer.assignTask(task);
    socket.emit("taskAssigned", {
      task,
      server: assignedServer,
    });
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
