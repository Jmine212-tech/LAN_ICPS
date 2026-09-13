import express from "express";
import {
  createdCustomer,
  deletedCustomer,
  getAllCustomer,
  getCusGroupByDate,
  updatedCustomer,
} from "../controllers/Cus.controller.js";

const CusRoute = express.Router();

CusRoute.get("/customers", getAllCustomer);
CusRoute.get("/customers/group", getCusGroupByDate);
CusRoute.post("/customers", createdCustomer);
CusRoute.put("/customers/:id", updatedCustomer);
CusRoute.delete("/customers/:id", deletedCustomer);

export default CusRoute;
