import { Request, Response } from "express";
import CUSTOMER from "../model/customer.js";
import { io } from "../server.js";

export const getAllCustomer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = await CUSTOMER.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(`[Server] error: `, error);
    res.status(500).json({ success: false, error });
  }
};

export const getCusGroupByDate = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const list = await CUSTOMER.aggregate([
      // 1. Filter ONLY users where age is 15

      // 2. Sort from latest to earliest
      {
        $sort: { createdAt: -1 },
      },
      // 3. Group by creation date (or another field)
      {
        $group: {
          _id: {
            $dateToString: { format: "%d.%m.%Y", date: "$createdAt" },
          },
          count: { $sum: 1 },

          //  Count 'finish' entries using $cond
          success: {
            $sum: {
              $cond: [{ $eq: ["$isFinish", "finish"] }, 1, 0],
            },
          },

          //  Count 'fail' entries using $cond
          fail: {
            $sum: {
              $cond: [{ $eq: ["$isFinish", "fail"] }, 1, 0],
            },
          },
          customers: {
            $push: {
              $mergeObjects: [
                "$$ROOT",
                { _id: { $toString: "$_id" } }, // Convert ObjectId to string
              ],
            },
          },
        },
      },
    ]);
    res.status(200).json({ success: true, list });
  } catch (error) {
    console.error(`[server] error: `, error);
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
    io.emit("customer:create", createdCustomer);
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
    io.emit("customer:update", updatedCustomer);
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
    io.emit("customer:delete", req.params.id);
    res
      .status(201)
      .json({ success: true, message: "deleted", data: deletedCustomer });
  } catch (error) {
    console.error(`[Server] error: `, error);
    res.status(500).json({ success: false, error });
  }
};
