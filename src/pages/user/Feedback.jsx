
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import QuickFeedbackButton from "@/components/QuickFeedbackButton";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";

const Feedback = () => {
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-forest-800 mb-2">Feedback</h1>
        <p className="text-gray-600 mb-6">
          We value your opinion and are committed to improving your experience
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-forest-700 mb-4">Quick Feedback</h2>
            <p className="text-gray-600 mb-6">
              Share your thoughts, suggestions, or report issues you've experienced with our platform. Your feedback helps us improve!
            </p>
            <QuickFeedbackButton />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-forest-700 mb-4">Previous Feedback</h2>
            <p className="text-gray-600 mb-6">
              View the status and responses to your previous feedback submissions.
            </p>
            <div className="p-6 bg-gray-50 rounded-md text-center">
              <p className="text-gray-500">You haven't submitted any feedback yet.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-forest-700 mb-4">Other Ways to Reach Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-forest-800 mb-2">Email Support</h3>
                <p className="text-sm text-gray-600">
                  Send us an email at <a href="mailto:support@bovbridge.com" className="text-forest-600 hover:underline">support@bovbridge.com</a>
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-forest-800 mb-2">Phone Support</h3>
                <p className="text-sm text-gray-600">
                  Call us at <a href="tel:+918001234567" className="text-forest-600 hover:underline">+91 800 123 4567</a>
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-forest-800 mb-2">Community Forum</h3>
                <p className="text-sm text-gray-600">
                  Join our <a href="#" className="text-forest-600 hover:underline">farmer community forum</a> to connect with other users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Add the floating feedback button that will be visible on all screens */}
      <FloatingFeedbackButton />
    </div>
  );
};

export default Feedback;
