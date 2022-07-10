const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");//const io = require("socket.io")(server, { cors: { origin: "*" } });
const io = new Server(server,  { cors: { origin: "*", method: ["GET", "POST"], } });

const PORT = process.env.PORT || 8000;

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  socket.on("joinRoom", (roomCode) => {
    socket.join(roomCode);

    const clients = io.sockets.adapter.rooms.get(roomCode)
    socket.emit("playerIndex", clients.size)

    if(clients.size === 2) {
      const firstPlayer = (Math.random() < 0.5) ? 1 : 2
      io.to(roomCode).emit("startGame", firstPlayer);
    }
  });

  socket.on("play", ({roomCode, payload, userSelection}) => {
    socket.broadcast.to(roomCode).emit("move", {
      payload: payload, 
      userSelection: userSelection
    });
  });

  socket.on('disconnect', () => {
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});