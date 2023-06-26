import { roomList } from "@/agent";
import { addPlayerToRoom, getExternalModuleTypes, resyncUserData } from "@/lib/funcs";

const { exec: ExecType , event: EventType} = getExternalModuleTypes()

const event: typeof EventType = {
  description: "user joinRoom.",
  exec: ({ io, socket, data: roomId }: typeof ExecType) => {
    if(!io || !socket) return
    const roomIndex = roomList.findIndex((room) => room.id === roomId);
    const foundRoom = roomList[roomIndex];
    if (!foundRoom) return;
    console.log("joinRoom", socket.id, foundRoom.id);
    addPlayerToRoom(io, socket, foundRoom.id);
    resyncUserData({ socket, id: roomId });
    socket.emit("gotoRoom", foundRoom);
    socket.broadcast.to(`${foundRoom.id}`).emit("updateRoom", foundRoom);
    console.log(`${socket.userData.name} added to`,foundRoom);
    io.to("0").emit("setRooms", roomList);
  },
};

export default event;

