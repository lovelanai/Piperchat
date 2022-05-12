import { Server } from "socket.io";

function getRooms(io) {
  const rooms = [];

  for (let [id, sockets] of io.sockets.adapter.rooms) {
    if (!sockets.has(id)) {
      rooms.push(id);
    }
  }

  return rooms;
}

export default getRooms;
