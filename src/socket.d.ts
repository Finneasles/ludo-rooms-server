import { Socket } from 'socket.io';

declare module 'socket.io' {
  interface Socket {
    userData: {
      nickname: string;
      curRoom: number;
    };
  }
}