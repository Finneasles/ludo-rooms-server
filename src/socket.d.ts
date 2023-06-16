import { Socket } from 'socket.io';

declare module 'socket.io' {
  interface Socket {
    userData: {
      name: string;
      curRoom: number;
    };
  }
}