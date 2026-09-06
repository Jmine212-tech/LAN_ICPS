// src/server.ts
import express2 from "express";
import http from "http";
import cors from "cors";

// src/router/Cus.router.ts
import express from "express";

// src/model/customer.ts
import mongoose from "mongoose";
var customer_schema = new mongoose.Schema(
  {
    // name, model, IMEI, fault, price, expense, isFinish, isTake, seNumb
    name: String,
    model: String,
    IMEI: String,
    fault: String,
    price: { type: Number, default: 0 },
    expense: { type: Number, default: 0 },
    isFinish: { type: String, default: "repairing" },
    isTake: { type: Boolean, default: false },
    seNumb: { type: Number, default: 1 }
  },
  { timestamps: true }
);
var CUSTOMER = mongoose.model("customers", customer_schema);
var customer_default = CUSTOMER;

// src/controllers/Cus.controller.ts
var getAllCustomer = async (req, res) => {
  try {
    const data = await customer_default.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(`[Server] error: `, error);
    res.status(500).json({ success: false, error });
  }
};
var createdCustomer = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ success: false, error: `[Server] No request from client` });
    const createdCustomer2 = await customer_default.create(req.body);
    io.emit("customer:create", createdCustomer2);
    res.status(201).json({ success: true, message: "Created", data: createdCustomer2 });
  } catch (error) {
    console.error(`[Server] error: `, error);
    res.status(500).json({ success: false, error });
  }
};
var updatedCustomer = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(404).json({ success: false, error: `[Server] Customer not found` });
    const updatedCustomer2 = await customer_default.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    io.emit("customer:update", updatedCustomer2);
    res.status(201).json({ success: true, message: "updated", data: updatedCustomer2 });
  } catch (error) {
    console.error(`[Server] error: `, error);
    res.status(500).json({ success: false, error });
  }
};
var deletedCustomer = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(404).json({ success: false, error: `[Server] Customer no found` });
    const deletedCustomer2 = await customer_default.findByIdAndDelete(req.params.id);
    io.emit("customer:delete", req.params.id);
    res.status(201).json({ success: true, message: "deleted", data: deletedCustomer2 });
  } catch (error) {
    console.error(`[Server] error: `, error);
    res.status(500).json({ success: false, error });
  }
};

// src/router/Cus.router.ts
var CusRoute = express.Router();
CusRoute.get("/customers", getAllCustomer);
CusRoute.post("/customers", createdCustomer);
CusRoute.put("/customers/:id", updatedCustomer);
CusRoute.delete("/customers/:id", deletedCustomer);
var Cus_router_default = CusRoute;

// src/DB/DB.ts
import mongoose2 from "mongoose";
var Connect_DB = async (url) => {
  try {
    await mongoose2.connect(url);
  } catch (error) {
    console.log(`[Server] error: `, error);
  }
};
var DB_default = Connect_DB;

// src/server.ts
import { Server } from "socket.io";
var app = express2();
var server = http.createServer(app);
var HOST = "0.0.0.0";
var PORT = 3010;
var DB_Url = "mongodb://127.0.0.1/Icrazy_db";
var io = new Server(server, { cors: { origin: "*" } });
app.use(express2.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
DB_default(DB_Url).then(() => console.log(`[Server] DB connected`));
app.use("/api", Cus_router_default);
server.listen(PORT, () => {
  console.log(`[Server] run at port: ${HOST}:${PORT}`);
});
export {
  io
};
//# sourceMappingURL=server.js.map
