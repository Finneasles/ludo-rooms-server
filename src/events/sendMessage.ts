import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  parameter: "sendMessage",
  description: "Send message to current room.",
  exec: (props: GameServerExec) => {
    console.log("sendMessage", props.socket.id, props.data);
    props.io
      .to(`${props.socket.userData.curRoom}`)
      .emit("receiveMessage", { author: props.socket.id, content: props.data });
  },
};

export default event;
