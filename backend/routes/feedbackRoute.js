import express from "express";
import FeedbackController from "../controller/FeedbackController.js";

const router  = express.Router()

router.post('/addfeedback',FeedbackController.addFeedback)
router.get('/getfeedback',FeedbackController.getAllFeedbacks)
export default router;