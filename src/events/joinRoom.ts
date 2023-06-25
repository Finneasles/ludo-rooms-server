import { roomList } from "@/agent";
import { addPlayerToRoom, resyncUserData } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  description: "user joinRoom.",
  exec: ({ io, socket, data: roomId }: GameServerExec) => {
    const roomIndex = roomList.findIndex((room) => room.id === roomId);
    const room = roomList[roomIndex];
    if (!room) return;
    console.log("joinRoom", socket.id, room.id);
    addPlayerToRoom(io, socket, room.id);
    resyncUserData({ socket, id: roomId });
    socket.emit("gotoRoom", room);
    socket.broadcast.to(`${room.id}`).emit("updateRoom", room);
    console.log(`${socket.userData.name} added to`,room);
    io.to("0").emit("setRooms", roomList);
  },
};

export default event;

