import { connectionNum, handleConNum } from "@/agent";
import { removeUserFromRoom } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  parameter: "disconnect",
  description: "user disconnect.",
  exec: ({ io, socket }: GameServerExec) => {
    handleConNum(connectionNum - 1);
    console.log("user disconnected", socket.id);
    removeUserFromRoom({
      io,
      socket,
    });
  },
};

export default event;
