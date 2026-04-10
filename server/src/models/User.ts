import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: string
}

const userSchema = new mongoose.Schema<IUser>({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["mentor", "student"],
    default: "student"
  }
});

export default mongoose.model<IUser>("User", userSchema);