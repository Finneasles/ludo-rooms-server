import { addRoom } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  parameter: "createRoom",
  description: "user createRoom.",
  exec: ({ io, socket, data }: GameServerExec) => {
    addRoom({io, socket, name: data.name });
  },
};

export default event;
