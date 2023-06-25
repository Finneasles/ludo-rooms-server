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