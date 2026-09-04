import { Request, Response } from "express";
import { CUSTOMER } from "../server.js";

export const getAllCustomer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await CUSTOMER.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(`[Server] error: `, error);
    res.status(500).json({ success: false, error });
  }
};

export const createdCustomer = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ success: false, error: `[Server] No request from client` });
    const createdCustomer = await CUSTOMER.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Created", data: createdCustomer });
  } catch (error) {
    console.error(`[Server] error: `, error);
    res.status(500).json({ success: false, error });
  }
};

export const updatedCustomer = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    if (!req.params.id)
      return res
        .status(404)
        .json({ success: false, error: `[Server] Customer not found` });
    const updatedCustomer = await CUSTOMER.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res
      .status(201)
      .json({ success: true, message: "updated", data: updatedCustomer });
  } catch (error) {
    console.error(`[Server] error: `, error);
    res.status(500).json({ success: false, error });
  }
};

export const deletedCustomer = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    if (!req.params.id)
      return res
        .status(404)
        .json({ success: false, error: `[Server] Customer no found` });
    const deletedCustomer = await CUSTOMER.findByIdAndDelete(req.params.id);
    res
      .status(201)
      .json({ success: true, message: "deleted", data: deletedCustomer });
  } catch (error) {
    console.error(`[Server] error: `, error);
    res.status(500).json({ success: false, error });
  }
};
