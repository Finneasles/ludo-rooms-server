import { roomList } from "@/agent";
import { GameRoom } from "@/lib/classes";
import { addPlayerToRoom, resyncUserData } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "@/types";

const event: GameServerEvent = {
  description: "user createRoom.",
  exec: ({ io, socket, data }: GameServerExec) => {
    const newRoom = new GameRoom(data, 0);
    roomList.push(newRoom);
    addPlayerToRoom(io, socket, newRoom.id);
    resyncUserData({ socket, id: newRoom.id });
    socket.emit("gotoRoom", { id: newRoom.id });
    console.log(`${socket.userData.name} added to ${newRoom.id}`);
    io.to("0").emit("setRooms", roomList);
  },
};

export default event;
