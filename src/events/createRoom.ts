import { roomList } from "@/agent";
import { GameRoom } from "@/lib/classes";
import { addPlayerToRoom } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "@/types";

const event: GameServerEvent = {
  parameter: "createRoom",
  description: "user createRoom.",
  exec: ({ io, socket, data }: GameServerExec) => {
    const newRoom = new GameRoom(data, 0);
    roomList.push(newRoom);
    addPlayerToRoom(io, socket, newRoom.id);
  },
};

export default event;
