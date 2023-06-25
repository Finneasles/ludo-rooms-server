import { roomList } from "@/agent";
import { addPlayerToRoom, resyncUserData } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  description: "user joinRoom.",
  exec: ({ io, socket, data: roomId }: GameServerExec) => {
    const roomIndex = roomList.findIndex((room) => room.id === roomId);
    const foundRoom = roomList[roomIndex];
    if (!foundRoom) return;
    console.log("joinRoom", socket.id, foundRoom.id);
    addPlayerToRoom(io, socket, foundRoom.id);
    resyncUserData({ socket, id: roomId });
    socket.emit("gotoRoom", foundRoom);
    socket.broadcast.to(`${foundRoom.id}`).emit("updateRoom", foundRoom);
    console.log(`${socket.userData.name} added to`,foundRoom);
    io.to("0").emit("setRooms", roomList);
  },
};

export default event;

