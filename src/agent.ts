import { NodeErrorListener, getRandomId } from "@/lib/funcs";
import { Server } from "socket.io";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { GameUser } from "@/lib/classes/gameUser";
import fs from "fs";
import path from "path";

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

const PORT = process.env.PORT || 4689;
NodeErrorListener();

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200);
  res.end("Server running...");
}).listen(PORT, () =>
  console.log({
    message: `Agent server is running on port: [${PORT}].`,
    type: "success",
  })
);

const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN || "*" },
});

const rootEvents = __dirname + "/events";
const eventsFiles = fs.readdirSync(rootEvents);

io.on("connection", (socket) => {
  handleConNum(connectionNum + 1);
  socket.userData = new GameUser(`Guest${getRandomId(4)}`);

  console.log(socket.userData.name, { connected: true });

  eventsFiles.forEach(async (file: string) => {
    if (!file.endsWith(".js")) return;
    await import(`${rootEvents}/${file}`).then((module) => {
      socket.on(file.split(".")[0], (data: any) => {
        module.default.exec({ io, socket, data });
      });
    });
  });

  socket.join(`${socket.userData.curRoom}`);
  console.log(socket.userData.name, { subscribedTo: socket.userData.curRoom });

  socket.emit("intData", {
    userData: socket.userData,
    curRoom: socket.userData.curRoom,
    rooms: roomList,
    connections: [{ id: 1 }, { id: 2 }],
  });
});
