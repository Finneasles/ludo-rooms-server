import { connectionNum, setConnectionNum } from "@/agent";
import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  parameter: "disconnect",
  description: "user disconnect.",
  exec: (props: GameServerExec) => {
    setConnectionNum(connectionNum - 1);
    console.log("user disconnected", props.socket.id);
  },
};

export default event;
