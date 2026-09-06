import mongoose from "mongoose";

const Connect_DB = async (url: string): Promise<void> => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log(`[Server] error: `, error);
  }
};
export default Connect_DB;
