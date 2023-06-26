import { roomList } from "@/agent";
import { getExternalModuleTypes, readyPlayerInRoom } from "@/lib/funcs";

const { exec: ExecType , event: EventType} = getExternalModuleTypes()

const event: typeof EventType = {
  description: "user readyUp in room.",
  exec: ({ io, socket, data }: typeof ExecType) => {
    if(!io || !socket) return
    const roomIndex = roomList.findIndex(
      (room) => room.id === socket.userData.curRoom
    );
    const foundRoom = roomList[roomIndex];
    if (!foundRoom) return;
    readyPlayerInRoom(io, socket, foundRoom.id);
  },
};

export default event;
