import { Request, Response } from "express";
import SERVICE from "../model/service.js";
import { io } from "../server.js";

export const getAllService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const services = await SERVICE.find();
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error(`[server] error: `, error);
    res.status(500).json("Internal Error");
  }
};

export const createdService = async (
  req: Request,
  res: Response,
): Promise<unknown> => {
  try {
    if(!req.body) return res.status(404).json({success: false, message: `[server] no request`})
    const createdService = await SERVICE.create(req.body);
    io.emit('service:create', createdService)
    res.status(201).json({success: true, message: `[service] created`, info: createdService})
  } catch (error) {
    console.error(`[server] error: `, error);
    res.status(500).json("Internal Error");
  }
};

export const updatedService = async (
  req: Request,
  res: Response,
): Promise<unknown> => {
  try {
    if(!req.params.id || !req.body) return res.status(404).json({success: false, message: `[server] request not found`})
    const updatedService = await SERVICE.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    io.emit('service:update', updatedService)
    res.status(201).json({success: true, message: `[service] updated`, info: updatedService})
  } catch (error) {
    console.error(`[server] error: `, error);
    res.status(500).json("Internal Error");
  }
};

export const deletedService = async (
  req: Request,
  res: Response,
): Promise<unknown> => {
  try {
    if(!req.params.id) return res.status(404).json({success: false, message: `[server] request not found`})
    const deletedService = await SERVICE.findByIdAndDelete(req.params.id);
    io.emit('service:delete', deletedService)
    res.status(201).json({success: true, message: `[service] deleted`, info: deletedService})
  } catch (error) {
    console.error(`[server] error: `, error);
    res.status(500).json("Internal Error");
  }
};