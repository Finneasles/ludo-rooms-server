import { roomList } from "@/agent";
import { addPlayerToRoom, resyncUserData } from "@/lib/funcs";
import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  description: "user joinRoom.",
  exec: ({ io,  socket, data }: GameServerExec) => {
    console.log("joinRoom", socket.id, data);
    addPlayerToRoom(io, socket, data);
    resyncUserData({ socket, id: data });;
    socket.emit("gotoRoom", { id: data });
    console.log(`${socket.userData.name} added to ${data}`);
    io.to("0").emit("setRooms", roomList)  },
};

export default event;

