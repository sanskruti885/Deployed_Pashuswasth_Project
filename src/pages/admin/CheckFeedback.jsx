import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CheckFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/feedback/getfeedback"); // Adjust the URL as needed
        console.log(response)
        setFeedbacks(response.data);
      } catch (error) {
        console.log("IN jsx catch")
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-green-800 mb-4">User Feedback</h1>

      {feedbacks.length > 0 ? (
        <div className="grid gap-4">
          {feedbacks.map((feedback) => (
            <Card key={feedback.id} className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Category:  {feedback.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-gray-800">Subject:  {feedback.subject}</p>
                <p className="text-gray-600 mt-2">Message:  {feedback.message}</p>
                <p className="text-yellow-600 mt-2">⭐ Rating: {feedback.rating}/5</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No feedback available.</p>
      )}
    </div>
  );
};

export default CheckFeedback;
