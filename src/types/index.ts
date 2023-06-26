import { Server, Socket } from "socket.io";

export interface GameServerEvent {
  name?: string;
  description?: string;
  parameter?: string;
  exec?: (args: any) => void;
  coolDown?: number;
}


export interface GameServerExec {
  io?: Server;
  socket?: Socket;
  data?: any;
}


