import { connectionNum, handleConNum, roomList } from "@/agent";
import { removePlayerFromRoom } from "@/lib/funcs";

import { GameServerEvent, GameServerExec } from "@/types";

const event: GameServerEvent = {
  description: "user disconnect.",
  exec: ({ io, socket, data }: GameServerExec) => {
    if(!io || !socket) return
    handleConNum(connectionNum - 1);
    const roomIndex = roomList.findIndex((room) => room.id === socket.userData.curRoom);
    const foundRoom = roomList[roomIndex];
    if (!foundRoom) return;
    removePlayerFromRoom(io, socket, socket.userData.curRoom);
    io.to(`${foundRoom.id}`).emit("updateRoom", foundRoom);
    io.to("0").emit("setRooms", roomList);
  },
};

export default event;
