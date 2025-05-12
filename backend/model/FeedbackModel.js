import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, enum: ["general", "technical", "suggestion", "complaint"]},
    subject: { type: String, required: true, unique: true },
    message: { type: String, required: true },
    rating: { type: String, required: true, enum: ["1", "2", "3", "4", "5"]},
  },{  collection: 'Feedback', timestamps: true},
  
);

const Feedback = mongoose.model.Feedback || mongoose.model("Feedback", feedbackSchema);
export default Feedback;
