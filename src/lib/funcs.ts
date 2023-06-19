import { roomList } from "@/agent";
import { Server, Socket } from "socket.io";

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

export const resyncUserData = async ({
  socket,
  id,
}: {
  id: number;
  socket: Socket;
}) => {
  socket.leave(`${socket.userData.curRoom}`);

  console.log(socket.userData.name, {
    unsubscribed: socket.userData.curRoom,
  });

  socket.userData.curRoom = id;

  socket.join(`${id}`);
  console.log(socket.userData.name, {
    subscribed: id,
  });
};

export function addPlayerToRoom(
  io: Server,
  socket: Socket,
  roomId: number
): void {
  const roomIndex = roomList.findIndex((room) => room.id === roomId);
  if (roomIndex !== -1) {
    roomList[roomIndex].players.push({ id: socket.id, ready: false });
  } else {
    console.log(`Room with ID ${roomId} does not exist.`);
  }
}

export function readyPlayerInRoom(
  io: Server,
  socket: Socket,
  roomId: number
): void {
  const roomIndex = roomList.findIndex((room) => room.id === roomId);
  if (roomIndex !== -1) {
    const playerIndex = roomList[roomIndex].players.findIndex(
      (player) => player.id === socket.id
    );
    if (playerIndex !== -1) {
      const toggledState = !roomList[roomIndex].players[playerIndex].ready;
      roomList[roomIndex].players[playerIndex].ready = toggledState;
      console.log(
        `${socket.userData.name} toggle ready:${toggledState} in ${roomId}`
      );
    } else {
      console.log(
        `Player with ID ${socket.id} does not exist in Room ${roomId}.`
      );
    }
  } else {
    console.log(`Room with ID ${roomId} does not exist.`);
  }
}

export function removePlayerFromRoom(
  io: Server,
  socket: Socket,
  roomId: number
): void {
  const roomIndex = roomList.findIndex((room) => room.id === roomId);
  if (roomIndex !== -1) {
    const playerIndex = roomList[roomIndex].players.findIndex(
      (player) => player.id === socket.id
    );
    if (playerIndex !== -1) {
      roomList[roomIndex].players.splice(playerIndex, 1);
      console.log(`${socket.userData.name} removed from ${roomId}`);
      if (roomList[roomIndex].players.length === 0) {
        // Last player - remove room
        roomList.splice(roomIndex, 1);
      }
    } else {
      console.log(
        `Player with ID ${socket.id} does not exist in Room ${roomId}.`
      );
    }
  } else {
    console.log(`Room with ID ${roomId} does not exist.`);
  }
}

export const getRandomId = (length: number = 9): number => {
  let min = Math.pow(10, length - 1);
  let max = min * 10 - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
