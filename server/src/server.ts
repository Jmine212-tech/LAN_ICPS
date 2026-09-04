import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import CusRoute from "./router/Cus.router.js";

const app = express();
const server = http.createServer(app);
const HOST = "0.0.0.0";
const PORT = 3010;
const DB_Url = "mongodb://127.0.0.1/Icrazy_db";

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Database
const Connected_DB = async (url: string): Promise<void> => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log(`[Server] error: `, error);
  }
};
// its schema
const customer_schema = new mongoose.Schema({
  name: String,
  model: String,
  IMEI: String,
  fault: String,
  price: String,
  expense: String,
  isFinish: String,
  isTake: Boolean,
  seNumb: Number,
});
// its model
export const CUSTOMER = mongoose.model("customers", customer_schema)

Connected_DB(DB_Url).then(() => console.log(`[Server] DB connected`))
// customer CRUD
app.use("/api", CusRoute)

server.listen(PORT, () => {
  console.log(`[Server] run at port: ${HOST}:${PORT}`);
});
