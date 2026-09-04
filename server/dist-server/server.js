// src/server.ts
import express2 from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";

// src/router/Cus.router.ts
import express from "express";

// src/controllers/Cus.controller.ts
var getAllCustomer = async (req, res) => {
  try {
    const data = await CUSTOMER.find();
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
    const createdCustomer2 = await CUSTOMER.create(req.body);
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
    const updatedCustomer2 = await CUSTOMER.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
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
    const deletedCustomer2 = await CUSTOMER.findByIdAndDelete(req.params.id);
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

// src/server.ts
var app = express2();
var server = http.createServer(app);
var HOST = "0.0.0.0";
var PORT = 3010;
var DB_Url = "mongodb://127.0.0.1/Icrazy_db";
app.use(express2.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
var Connected_DB = async (url) => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log(`[Server] error: `, error);
  }
};
var customer_schema = new mongoose.Schema({
  name: String,
  model: String,
  IMEI: String,
  fault: String,
  price: String,
  expense: String,
  isFinish: String,
  isTake: Boolean,
  seNumb: Number
});
var CUSTOMER = mongoose.model("customers", customer_schema);
Connected_DB(DB_Url).then(() => console.log(`[Server] DB connected`));
app.use("/api", Cus_router_default);
server.listen(PORT, () => {
  console.log(`[Server] run at port: ${HOST}:${PORT}`);
});
export {
  CUSTOMER
};
//# sourceMappingURL=server.js.map
