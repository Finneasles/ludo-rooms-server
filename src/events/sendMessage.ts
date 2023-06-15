import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  parameter: "sendMessage",
  description: "user sendMessage.",
  exec: (props: GameServerExec) => {
    console.log("sendMessage", props.socket.id, props.data);
    props.socket
      .to(`${props.socket.userData.curRoom}`)
      .emit("receiveMessage", props.data);
  },
};

export default event;
