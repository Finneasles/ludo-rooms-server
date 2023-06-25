import { getRandomId } from "@/lib/funcs";
import { GameRoom } from "@/lib/classes/gameRoom";

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
