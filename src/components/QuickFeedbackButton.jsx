
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import FeedbackDialog from "./FeedbackDialog";

const QuickFeedbackButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  return (
    <>
      <Button 
        onClick={() => setDialogOpen(true)}
        className="group bg-forest-600 hover:bg-forest-700 shadow-md transition-all hover:shadow-lg"
      >
        <MessageSquare className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
        Share Your Feedback
      </Button>
      
      <FeedbackDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </>
  );
};

export default QuickFeedbackButton;
