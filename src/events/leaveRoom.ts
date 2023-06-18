import { roomList } from "@/agent";
import { removePlayerFromRoom, resyncUserData } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  parameter: "leaveRoom",
  description: "user leaveRoom.",
  exec: ({ io, socket }: GameServerExec) => {
    removePlayerFromRoom(io, socket, socket.userData.curRoom);
    resyncUserData({ socket, id: 0 });
    socket.emit("gotoRoom", { id: 0 });
    io.to("0").emit("setRooms", roomList);
  },
};

export default event;
