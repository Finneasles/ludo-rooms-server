import { connectionNum, handleConNum, roomList } from "@/agent";
import { removePlayerFromRoom } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "@/types";

const event: GameServerEvent = {
  parameter: "disconnect",
  description: "user disconnect.",
  exec: ({ io, socket }: GameServerExec) => {
    handleConNum(connectionNum - 1);
    removePlayerFromRoom(io, socket, socket.userData.curRoom);
  },
};

export default event;
