// src/server.ts
import express3 from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

// src/DB/DB.ts
import mongoose from "mongoose";
var Connect_DB = async (url) => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log(`[Server] error: `, error);
  }
};
var DB_default = Connect_DB;

// src/router/Cus.Route.ts
import express from "express";

// src/model/customer.ts
import mongoose2 from "mongoose";
var customer_schema = new mongoose2.Schema(
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
var CUSTOMER = mongoose2.model("customers", customer_schema);
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
var getCusGroupByDate = async (req, res) => {
  try {
    const list = await customer_default.aggregate([
      // 1. Filter ONLY users where age is 15
      // 2. Sort from latest to earliest
      {
        $sort: { createdAt: -1 }
      },
      // 3. Group by creation date (or another field)
      {
        $group: {
          _id: {
            $dateToString: { format: "%d.%m.%Y", date: "$createdAt" }
          },
          count: { $sum: 1 },
          //  Count 'finish' entries using $cond
          success: {
            $sum: {
              $cond: [{ $eq: ["$isFinish", "finish"] }, 1, 0]
            }
          },
          //  Count 'fail' entries using $cond
          fail: {
            $sum: {
              $cond: [{ $eq: ["$isFinish", "fail"] }, 1, 0]
            }
          },
          customers: {
            $push: {
              $mergeObjects: [
                "$$ROOT",
                { _id: { $toString: "$_id" } }
                // Convert ObjectId to string
              ]
            }
          }
        }
      }
    ]);
    res.status(200).json({ success: true, list });
  } catch (error) {
    console.error(`[server] error: `, error);
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

// src/router/Cus.Route.ts
var CusRoute = express.Router();
CusRoute.get("/customers", getAllCustomer);
CusRoute.get("/customers/group", getCusGroupByDate);
CusRoute.post("/customers", createdCustomer);
CusRoute.put("/customers/:id", updatedCustomer);
CusRoute.delete("/customers/:id", deletedCustomer);
var Cus_Route_default = CusRoute;

// src/router/service.Route.ts
import express2 from "express";

// src/model/service.ts
import mongoose3 from "mongoose";
var service_schema = new mongoose3.Schema({
  brand: { type: String, require: true },
  model: { type: String, require: true },
  fault: { type: String, require: true },
  price: { type: Number, require: true },
  note: { type: String }
});
var SERVICE = mongoose3.model("services", service_schema);
var service_default = SERVICE;

// src/controllers/service.controller.ts
var getAllService = async (req, res) => {
  try {
    const services = await service_default.find();
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error(`[server] error: `, error);
    res.status(500).json("Internal Error");
  }
};
var createdService = async (req, res) => {
  try {
    if (!req.body) return res.status(404).json({ success: false, message: `[server] no request` });
    const createdService2 = await service_default.create(req.body);
    io.emit("service:create", createdService2);
    res.status(201).json({ success: true, message: `[service] created`, info: createdService2 });
  } catch (error) {
    console.error(`[server] error: `, error);
    res.status(500).json("Internal Error");
  }
};
var updatedService = async (req, res) => {
  try {
    if (!req.params.id || !req.body) return res.status(404).json({ success: false, message: `[server] request not found` });
    const updatedService2 = await service_default.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    io.emit("service:update", updatedService2);
    res.status(201).json({ success: true, message: `[service] updated`, info: updatedService2 });
  } catch (error) {
    console.error(`[server] error: `, error);
    res.status(500).json("Internal Error");
  }
};
var deletedService = async (req, res) => {
  try {
    if (!req.params.id) return res.status(404).json({ success: false, message: `[server] request not found` });
    const deletedService2 = await service_default.findByIdAndDelete(req.params.id);
    io.emit("service:delete", deletedService2);
    res.status(201).json({ success: true, message: `[service] deleted`, info: deletedService2 });
  } catch (error) {
    console.error(`[server] error: `, error);
    res.status(500).json("Internal Error");
  }
};

// src/router/service.Route.ts
var serviceRoute = express2.Router();
serviceRoute.get("/services", getAllService);
serviceRoute.post("/services", createdService);
serviceRoute.put("/services/:id", updatedService);
serviceRoute.delete("/services/:id", deletedService);
var service_Route_default = serviceRoute;

// src/server.ts
var app = express3();
var server = http.createServer(app);
var HOST = "0.0.0.0";
var PORT = 3010;
var DB_Url = "mongodb://127.0.0.1/Icrazy_db";
var io = new Server(server, { cors: { origin: "*" } });
app.use(express3.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
DB_default(DB_Url).then(() => console.log(`[Server] DB connected`));
app.use("/api", Cus_Route_default);
app.use("/api", service_Route_default);
server.listen(PORT, () => {
  console.log(`[Server] run at port: ${HOST}:${PORT}`);
});
export {
  io
};
//# sourceMappingURL=server.js.map
