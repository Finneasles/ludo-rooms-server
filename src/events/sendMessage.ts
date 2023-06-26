import { getExternalModuleTypes } from "@/lib/funcs";

const { exec: ExecType , event: EventType} = getExternalModuleTypes()

const event: typeof EventType = {
  description: "user sendMessage.",
  exec: ({ io, socket, data }: typeof ExecType) => {
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