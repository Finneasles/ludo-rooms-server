import { GameServerEvent, GameServerExec } from "types";

const event: GameServerEvent = {
  parameter: "joinRoom",
  description: "user joinRoom.",
  exec: (props: GameServerExec) => {
    console.log("joinRoom", props.socket.id, props.data);
    props.socket.join(`room${props.data.id}`);
    props.socket.userData.curRoom = props.data.id;
  },
};

export default event;
