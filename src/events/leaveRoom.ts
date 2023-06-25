import { roomList } from "@/agent";
import { removePlayerFromRoom, resyncUserData } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  description: "user leaveRoom.",
  exec: ({ io, socket }: GameServerExec) => {
    const roomIndex = roomList.findIndex(
      (room) => room.id === socket.userData.curRoom
    );
    const room = roomList[roomIndex];
    if (!room) return;
    removePlayerFromRoom(io, socket, room.id);
    resyncUserData({ socket, id: 0 });
    socket.emit("gotoRoom", 0);
    io.to(`${room.id}`).emit("updateRoom", room);
    io.to("0").emit("setRooms", roomList);
  },
};

export default event;
