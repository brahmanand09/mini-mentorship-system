import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
  studentId: string
  name: string
  email: string
  phone?: string
  targetYear?: number
  status: "active" | "inactive"
  createdAt: Date
}

const studentSchema = new Schema<IStudent>(
  {
    studentId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    targetYear: Number,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

studentSchema.index({ email: 1 });

export default mongoose.model<IStudent>("Student", studentSchema);