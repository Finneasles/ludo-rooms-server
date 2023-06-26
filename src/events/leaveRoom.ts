import { roomList } from "@/agent";
import { getExternalModuleTypes, removePlayerFromRoom, resyncUserData } from "@/lib/funcs";

const { exec: ExecType , event: EventType} = getExternalModuleTypes()

const event: typeof EventType = {
  description: "user leaveRoom.",
  exec: ({ io, socket, data }: typeof ExecType) => {
    if(!io || !socket) return
    const roomIndex = roomList.findIndex(
      (room) => room.id === socket.userData.curRoom
    );
    const foundRoom = roomList[roomIndex];
    if (!foundRoom) return;
    removePlayerFromRoom(io, socket, foundRoom.id);
    resyncUserData({ socket, id: 0 });
    socket.emit("gotoRoom", 0);
    io.to(`${foundRoom.id}`).emit("updateRoom", foundRoom);
    io.to("0").emit("setRooms", roomList);
  },
};

export default event;
