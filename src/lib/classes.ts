import { Socket } from "socket.io";
import { getRandomId } from "@/lib/funcs";

export class GameUser {
  name: string;
  curRoom: number;
  curZone: number;
  
  constructor(name: string, room: number = 0, zone: number = 0) {
    this.name = name;
    this.curRoom = room;
    this.curZone = zone;
  }
}

export class GameZone {
  id: number;
  roomNum: number;
  rooms: GameRoom[];
  constructor() {
    this.id = getRandomId();
    this.roomNum = 0;
    this.rooms = [];
  }
}

export class GameRoom {
  id: number;
  options: { name : string };
  players: any[];
  zone: number;
  constructor(options: { name : string}, zone?: number) {
    this.options = { name : options.name};
    this.id = getRandomId();
    this.players = []
    this.zone = zone || 0;
  }
}