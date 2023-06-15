import { NodeErrorListener } from "@/lib/funcs";
import { Server } from "socket.io";
import * as http from "http";
import fs from "fs";

export let connectionNum = 0;
export let roomHandler: {
  rooms: { id: number; name: string }[];
  roomsNum: number;
} = {
  rooms: [],
  roomsNum: 0,
};

export const setConnectionNum = (n: number) => {
  connectionNum = n;
};

export const addRoom = ({ name, id }: { name: string; id: number }) => {
  roomHandler.rooms = [...roomHandler.rooms, { name, id }];
  console.log("Created room", { id , name});
};

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

class User {
  nickname: string;
  curRoom: number;
  constructor(nickname: string) {
    this.nickname = nickname;
    this.curRoom = 0;
  }
}

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);
  connectionNum++;
  socket.userData = new User(`Guest${connectionNum}`);

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
