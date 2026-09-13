import express from "express";
import {
  createdService,
  deletedService,
  getAllService,
  updatedService,
} from "../controllers/service.controller.js";
const serviceRoute = express.Router();

serviceRoute.get("/services", getAllService);
serviceRoute.post("/services", createdService);
serviceRoute.put("/services/:id", updatedService);
serviceRoute.delete("/services/:id", deletedService);

export default serviceRoute;
