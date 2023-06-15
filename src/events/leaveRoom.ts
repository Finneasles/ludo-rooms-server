import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  parameter: "leaveRoom",
  description: "user leaveRoom.",
  exec: (props: GameServerExec) => {
    console.log("leaveRoom", props.socket.id, props.data);
  },
};

export default event;
