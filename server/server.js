import { Server } from "socket.io";
import getRooms from "./roomsStore.js";

const io = new Server();

io.use((socket, next) => {
  const nickname = socket.handshake.auth.nickname;
  if (!nickname || nickname.length < 0) {
    return next(new Error("Invalid nickname"));
  }
  socket.data.nickname = nickname;
  next();
});

io.on("connection", (socket) => {
  console.log(socket.data.nickname, "connected");

  socket.emit("welcome", "Welcome to our chat app!");

  if (socket.data.nickname) {
    socket.emit("connected", socket.data.nickname);
    socket.emit("room-list", getRooms(io));
    socket.emit("user-list");

    socket.on("join", (room) => {
      const roomWillBeCreated = !getRooms(io).includes(room);
      socket.join(room);

      // We are about to create a new room
      if (roomWillBeCreated) {
        io.emit("room-list", getRooms(io));
      }
      socket.emit("joined", room);
      console.log(socket.data.nickname, "joined", room);

      // check how many users are in a joined room
      const numberOfUsers = io.sockets.adapter.rooms.get(room).size;
      console.log(numberOfUsers);
      io.emit("clientsInRoom", numberOfUsers);
    });

    // send message and nickname to client
    socket.on("message", (chatMessage, room) => {
      console.log(chatMessage, room);
      io.to(room).emit("message", {
        chatMessage: chatMessage,
        from: socket.data.nickname,
        room: room,
      });
    });

    socket.on("leave", (room) => {
      socket.leave(room);
      console.log(socket.data.nickname, "left the room", room);
      socket.emit("left", room);
      io.emit("room-list", getRooms(io));
      console.log(getRooms(io));
    });

    socket.on("isTyping", (data, room) => {
      if (data.isTyping) {
        socket.broadcast
          .to(data.room)
          .emit("isTyping", `${data.user} is typing...`);
        console.log(data.user, "is typing!!...");
      } else {
        socket.broadcast.to(data.room).emit("isTyping", "");
        console.log("...");
      }
    });

    socket.on("disconnect", () => {
      console.log(socket.data.nickname, "disconnected");
    });
  }
});

io.listen(5500);

// Beskrivning av olika meddelanden ifrån socket eller io:

// socket.emit('message', "this is a test"); //sending to sender-client only

// socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender

// socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender

// socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)

// socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid

// io.emit('message', "this is a test"); //sending to all clients, include sender

// io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender

// io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender

// socket.emit(); //send to all connected clients

// socket.broadcast.emit(); //send to all connected clients except the one that sent the message

// socket.on(); //event listener, can be called on client to execute on server

// io.sockets.socket(); //for emiting to specific clients

// io.sockets.emit(); //send to all connected clients (same as socket.emit)

// io.sockets.on() ; //initial connection from a client.

// */
