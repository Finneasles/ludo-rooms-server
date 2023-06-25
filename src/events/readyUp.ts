import { roomList } from "@/agent";
import { readyPlayerInRoom } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "@/types";

const event: GameServerEvent = {
  description: "user readyUp in room.",
  exec: ({ io, socket }: GameServerExec) => {
    const roomIndex = roomList.findIndex(
      (room) => room.id === socket.userData.curRoom
    );
    const room = roomList[roomIndex];
    if (!room) return;
    readyPlayerInRoom(io, socket, room.id);
  },
};

export default event;
