import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  studentId: string
  mentorId: mongoose.Types.ObjectId
  review: string
  aiSummary?: string
  createdAt: Date
}

const reviewSchema = new Schema<IReview>(
  {
    studentId: {
      type: String,
      required: true
    },
    mentorId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    review: {
      type: String,
      required: true
    },
    aiSummary: String
  },
  { timestamps: true }
);

reviewSchema.index({ studentId: 1 });

export default mongoose.model<IReview>("Review", reviewSchema);