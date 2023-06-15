import { addRoom, roomHandler } from "@/agent";
import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  parameter: "createRoom",
  description: "user createRoom.",
  exec: (props: GameServerExec) => {
    console.log("createRoom", props.socket.id, props.data);
    const id = parseInt(Math.random().toString().slice(2, 9));
    addRoom({ name: props.data.name, id });
    props.socket.leave(`${props.socket.userData.curRoom}`);
    props.socket.to("0").emit("setRooms", roomHandler.rooms);
    props.socket.userData.curRoom = id;
    props.socket.join(`${props.socket.userData.curRoom}`);
    props.socket
      .emit("gotoRoom", { id, name: props.data.name });
  },
};

export default event;
