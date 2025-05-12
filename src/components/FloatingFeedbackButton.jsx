
import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import FeedbackDialog from "./FeedbackDialog";

const FloatingFeedbackButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-forest-600 hover:bg-forest-700 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
        aria-label="Give Feedback"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
      
      <FeedbackDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </>
  );
};

export default FloatingFeedbackButton;
