import { roomList } from "@/agent";
import { GameRoom } from "@/lib/classes/gameRoom";
import { addPlayerToRoom, resyncUserData } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  description: "user createRoom.",
  exec: ({ io, socket, data }: GameServerExec) => {
    const newRoom = new GameRoom(data, 0);
    roomList.push(newRoom);
    addPlayerToRoom(io, socket, newRoom.id);
    resyncUserData({ socket, id: newRoom.id });

    const roomIndex = roomList.findIndex(
      (room) => room.id === socket.userData.curRoom
    );
    const foundRoom = roomList[roomIndex];

    if (!foundRoom) return;
    socket.emit("gotoRoom", foundRoom);
    console.log(`${socket.userData.name} added to ${foundRoom.id}`);
    socket.emit("updateRoom", foundRoom);
    io.to("0").emit("setRooms", roomList);
  },
};

export default event;
