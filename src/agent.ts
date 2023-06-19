import { NodeErrorListener, getRandomId } from "@/lib/funcs";
import { Server } from "socket.io";
import * as http from "http";
import fs from "fs";
import { GameUser } from "@/lib/classes";

export let defaultZones = [{ id: 0 }, { id: 1 }];

export let roomList: {
  id: number;
  options: { name: string };
  players: any[];
  zone: number;
}[] = [];

export let connectionNum = 0;

export const handleConNum = (n1: number) => {
  connectionNum = n1;
};

const PORT = process.env.PORT || "4689";
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
  handleConNum(connectionNum + 1);
  socket.userData = new GameUser(`Guest${getRandomId(4)}`);

  console.log(socket.userData.name, { connected: true });
  
  eventsFiles.forEach((file: string) => {
    import(`@/${eventsDir}` + file).then((module) => {
      socket.on(file.split(".")[0], (data: any) => {
        module.default.exec({ io, socket, data });
      });
    });
  });

  socket.join(`${socket.userData.curRoom}`);
  console.log(socket.userData.name, { subscribedTo: socket.userData.curRoom });

  socket.emit("intData", {
    curRoom: socket.userData.curRoom,
    rooms: roomList,
    connections: [{ id: 1 }, { id: 2 }],
  });
});
