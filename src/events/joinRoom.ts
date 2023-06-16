import { addUserToRoom } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  parameter: "joinRoom",
  description: "user joinRoom.",
  exec: ({ io,  socket, data }: GameServerExec) => {
    console.log("joinRoom", socket.id, data);
    addUserToRoom({ io, socket, room: { id : data}});
  },
};

export default event;

