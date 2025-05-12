import Feedback from "../model/FeedbackModel.js";

// Controller to add feedback
export const addFeedback = async (req, res) => {
  try {
    const { category, subject, message, rating } = req.body;

    // Check if all fields are provided
    if (!category || !subject || !message || !rating) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if feedback with the same subject already exists
    // const existingFeedback = await Feedback.findOne({ subject });
    // if (existingFeedback) {
    //   return res.status(400).json({ error: "Feedback with this subject already exists" });
    // }

    // Create new feedback entry
    const feedback = new Feedback({ category, subject, message, rating });
    await feedback.save();

    return res.status(201).json({ success: true, message: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error("Error adding feedback:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllFeedbacks = async (req, res) => {
  console.log("In feedback")
    try {
      const feedbacks = await Feedback.find();
      res.status(200).json(feedbacks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch feedback" });
    }
  };

export default {addFeedback,getAllFeedbacks}