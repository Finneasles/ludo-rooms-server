import { readyPlayerInRoom, resyncUserData } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "@/types";

const event: GameServerEvent = {
  description: "user readyUp in room.",
  exec: ({ io, socket }: GameServerExec) => {
    readyPlayerInRoom(io, socket, socket.userData.curRoom);
  },
};

export default event;
