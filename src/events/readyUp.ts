import { roomList } from "@/agent";
import { readyPlayerInRoom } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "@/types";

const event: GameServerEvent = {
  description: "user readyUp in room.",
  exec: ({ io, socket, data }: GameServerExec) => {
    if(!io || !socket) return
    const roomIndex = roomList.findIndex(
      (room) => room.id === socket.userData.curRoom
    );
    const foundRoom = roomList[roomIndex];
    if (!foundRoom) return;
    readyPlayerInRoom(io, socket, foundRoom.id);
  },
};

export default event;
