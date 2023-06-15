import { normalizePort } from "@/lib/funcs";
import { createServer } from "http";
import { Server } from "socket.io";

export const create = ({ app, port }: { app: any; port: string }) => {
  const PORT = normalizePort({ val: port });
  const server = createServer(app);
  const io = new Server(server, { cors: { origin: "*" } });
  server.listen(PORT, () => {
    console.log("listening");
  });

  io.on("connection", (socket) => {
    console.log("listening", socket.id);
  });

  return { server: io, normalPort: PORT };
};

export default create;
