import mongoose from "mongoose";

// service error - brand > model > fault > prince
const service_schema = new mongoose.Schema({
  brand: { type: String, require: true },
  model: { type: String, require: true },
  fault: { type: String, require: true },
  price: { type: Number, require: true },
  note: { type: String },
});

const SERVICE = mongoose.model("services", service_schema);
export default SERVICE;
