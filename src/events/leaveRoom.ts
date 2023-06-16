import { removeUserFromRoom } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  parameter: "leaveRoom",
  description: "user leaveRoom.",
  exec: ({ io, socket }: GameServerExec) => {
    removeUserFromRoom({
      io,
      socket,
    });
  },
};

export default event;
