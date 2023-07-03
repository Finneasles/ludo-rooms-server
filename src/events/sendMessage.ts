import { getExternalModuleTypes } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "@/types";

const event:GameServerEvent = {
  description: "user sendMessage.",
  exec: ({ io, socket, data }: GameServerExec) => {
    if(!io || !socket) return
    console.log("sendMessage", socket.id, socket.userData.curRoom);
    io.to(`${socket.userData.curRoom}`).emit("receiveMessage", {
      author: { id: socket.id, name: socket.userData.name },
      content: data,
      date: new Date()
    });
  },
};

export default event;