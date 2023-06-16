import { roomHandler } from "@/agent";
import { Server, Socket } from "socket.io";
import { GameRoom } from "./classes";

export const NodeErrorListener = () => {
  process.on("unhandledRejection", (reason, promise) =>
    console.log({
      message: `Unhandled Promise Rejection: ${reason}`,
      promise,
      type: "warn",
    })
  );
  process.on("uncaughtException", (error) =>
    console.log({ message: `Uncaught Exception: ${error.stack}`, type: "warn" })
  );
  process.on("uncaughtExceptionMonitor", (error, origin) =>
    console.log({
      message: `Uncaught Exception Monitor: ${error.stack}`,
      origin,
      type: "warn",
    })
  );
};

export const normalizePort = ({ val }: { val: string }) => {
  const port = parseInt(val.toString(), 10);
  if (isNaN(port) && +val <= 0) {
    throw new Error("Invalid port");
  }
  return port;
};

export const addRoom = ({
  io,
  socket,
  name,
}: {
  io: Server;
  name: string;
  socket: Socket;
}) => {
  const newRoom = new GameRoom(socket, name);
  roomHandler.rooms = [...roomHandler.rooms, newRoom];
  console.log(socket.userData.name, { createdRoom: { id: newRoom.id, name } });
  addUserToRoom({ io, socket, room: { id: newRoom.id } });
};

export const addUserToRoom = ({
  socket,
  io,
  room,
}: {
  room: { id: number };
  io: Server;
  socket: Socket;
}) => {
  const selectedRoom = roomHandler.rooms.find((room) => room.id === room.id);

  if (!selectedRoom)
    return socket.emit("gotoRoom", {
      id: 0,
      error: { message: "Room not found" },
    });

  selectedRoom.players?.push({ id: socket.id, name: socket.userData.name });
  console.log(socket.userData.name, { addedToRoom: selectedRoom });

  socket.leave(`${socket.userData.curRoom}`);
  console.log(socket.userData.name, { leftOldRoom: selectedRoom });

  socket.userData.curRoom = room.id;
  socket.join(`${socket.userData.curRoom}`);
  console.log(socket.userData.name, { joinedRoom: selectedRoom });

  socket.to(`${socket.userData.curRoom}`).emit(
    "updateRoom",
    roomHandler.rooms.find((room) => {
      return room.id == socket.userData.curRoom;
    })
  );
  console.log(socket.userData.name, { updateCurRoom: roomHandler.rooms });

  socket.emit("gotoRoom", { id: socket.userData.curRoom });
  console.log(socket.userData.name, { gotoRoom: socket.userData.curRoom });

  io.to("0").emit("setRooms", roomHandler.rooms);
  console.log(socket.userData.name, { updateAllRooms: roomHandler.rooms });
};

export const removeUserFromRoom = ({
  socket,
  io,
}: {
  io: Server;
  socket: Socket;
}) => {
  const room = roomHandler.rooms.find(
    (room) => room.id === socket.userData.curRoom
  );
  if (!room) return;

  room.players = room.players?.filter((player) => player.id !== socket.id);
  checkAndDeleteEmptyRoom({ io, roomId: socket.userData.curRoom });

  console.log(socket.userData.name, { removedFrom: room });

  socket.leave(`${socket.userData.curRoom}`);

  socket.userData.curRoom = 0;
  socket.join(`${socket.userData.curRoom}`);
  socket.emit("gotoRoom", { id: 0 });

  io.to("0").emit("setRooms", roomHandler.rooms);
};

export function checkAndDeleteEmptyRoom({
  io,
  roomId,
}: {
  io: Server;
  roomId: number;
}) {
  const roomIndex = roomHandler.rooms.findIndex((room) => room.id === roomId);

  if (roomIndex === -1) {
    console.log("Room not found.");
    return;
  }

  const room = roomHandler.rooms[roomIndex];

  if (room.players?.length === 0) {
    roomHandler.rooms.splice(roomIndex, 1);
    io.to(`0`).emit("getRooms", roomHandler.rooms);
    console.log(`Room ${roomId} deleted as there are no users left.`);
  } else {
    console.log(`Room ${roomId} still has users.`);
  }
}
