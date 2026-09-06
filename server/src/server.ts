import express from "express";
import http from "http";
import cors from "cors";
import CusRoute from "./router/Cus.router.js";
import Connect_DB from "./DB/DB.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const HOST = "0.0.0.0";
const PORT = 3010;
const DB_Url = "mongodb://127.0.0.1/Icrazy_db";

export const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

Connect_DB(DB_Url).then(() => console.log(`[Server] DB connected`));
// customer CRUD
app.use("/api", CusRoute);

server.listen(PORT, () => {
  console.log(`[Server] run at port: ${HOST}:${PORT}`);
});
