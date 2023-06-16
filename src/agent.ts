import { NodeErrorListener } from "@/lib/funcs";
import { Server } from "socket.io";
import * as http from "http";
import fs from "fs";
import { GameUser } from "@/lib/classes";

export let connectionNum = 0;
export let roomHandler: {
  rooms: {
    id: number;
    name: string;
    players?: { name: string; id: string }[];
  }[];
  roomsNum: number;
} = {
  rooms: [],
  roomsNum: 0,
};

export const handleConNum = (n1: number) =>{
  connectionNum = n1;
}

const PORT = process.env.PORT || "4737";
NodeErrorListener();

const server = http.createServer().listen(PORT, () =>
  console.log({
    message: `Agent server is running on port: [${PORT}].`,
    type: "success",
  })
);

const io = new Server(server, { cors: { origin: "*" } });
const eventsDir = "/events/";
const eventsFiles = fs.readdirSync(__dirname + eventsDir);

io.on("connection", (socket) => {
  handleConNum(connectionNum+ 1)
  socket.userData = new GameUser(`Guest${connectionNum}`);
  console.log(socket.userData.name, { connected: true });
  eventsFiles.forEach((file: string) => {
    import(`@/${eventsDir}` + file).then((module) => {
      // console.log(`loaded ${module.default.parameter}`);
      socket.on(module.default.parameter, (data: any) => {
        module.default.exec({ io, socket, data });
      });
    });
  });
  socket.join(`${socket.userData.curRoom}`);
  socket.emit("setRooms", roomHandler.rooms);
});
