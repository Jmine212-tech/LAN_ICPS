import express from "express";
import {
  createdCustomer,
  deletedCustomer,
  getAllCustomer,
  updatedCustomer,
} from "../controllers/Cus.controller.js";

const CusRoute = express.Router();

CusRoute.get("/customers", getAllCustomer);
CusRoute.post("/customers", createdCustomer);
CusRoute.put("/customers/:id", updatedCustomer);
CusRoute.delete("/customers/:id", deletedCustomer);

export default CusRoute;
