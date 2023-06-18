import { removePlayerFromRoom, resyncUserData } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  parameter: "leaveRoom",
  description: "user leaveRoom.",
  exec: ({ io, socket }: GameServerExec) => {
    removePlayerFromRoom(io, socket, socket.userData.curRoom);
    socket.emit("gotoRoom", {id : 0});
    resyncUserData({ socket, id : 0});
  },
};

export default event;
