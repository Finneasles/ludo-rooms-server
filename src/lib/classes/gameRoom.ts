import { getRandomId } from "@/lib/funcs";

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