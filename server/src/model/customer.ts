import mongoose from "mongoose";

const customer_schema = new mongoose.Schema(
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
    seNumb: { type: Number, default: 1 },
  },
  { timestamps: true },
);
const CUSTOMER = mongoose.model("customers", customer_schema);
export default CUSTOMER;
