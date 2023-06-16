import { Socket } from "socket.io";

export class GameUser {
  name: string;
  curRoom: number;
  constructor(name: string) {
    this.name = name;
    this.curRoom = 0;
  }
}

export class GameRoom {
  id: number;
  name: string;
  players: { id: string; name: string }[];
  constructor(socket: Socket, name: string) {
    this.name = name;
    this.players = [{ id: socket.id, name: socket.userData.name }];
    this.id = parseInt(Math.random().toString().slice(2, 9));
  }
}
