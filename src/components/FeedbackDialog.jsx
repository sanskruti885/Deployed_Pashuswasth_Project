import axios from "axios";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, ThumbsUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const feedbackFormSchema = z.object({
  category: z.enum(["general", "technical", "suggestion", "complaint"], {
    required_error: "Please select a category.",
  }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  rating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Please select a rating.",
  }),
});

const FeedbackDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      category: "general",
      subject: "",
      message: "",
      rating: "5",
    },
  });
  
  const onSubmit = async (data) => {
    console.log(data);
    try {
      console.log("Sending feedback:", data);
      
      const response = await axios.post("http://localhost:4000/feedback/addfeedback", data);
      
      if (response.data.success) {
        toast({
          title: "Feedback Submitted",
          description: "Thank you for your feedback! We appreciate your input.",
        });
        setSubmitted(true);
      } } catch (error) {
        console.error("Error submitting feedback:", error);
        toast({
          title: "Submission Failed",
          description: "There was an issue submitting your feedback. Please try again.",
          variant: "destructive",
        });
      }
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! We appreciate your input.",
      });
      
      setSubmitted(true);
    }, 1000);
  };
  
  const submitAnotherFeedback = () => {
    form.reset();
    setSubmitted(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {submitted ? (
          <div className="pt-6 pb-6 text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-green-100 p-4 rounded-full">
                <ThumbsUp className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <DialogTitle className="text-2xl mb-3 text-earth-800">Thank You for Your Feedback!</DialogTitle>
            <DialogDescription className="text-base mb-8">
              Your feedback has been submitted successfully. We value your input and will use it to improve our services.
            </DialogDescription>
            
            <Button onClick={submitAnotherFeedback} className="bg-forest-600 hover:bg-forest-700">
              Submit Another Feedback
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-earth-800">Submit Feedback</DialogTitle>
              <DialogDescription>
                We value your opinion. Please share your thoughts, suggestions, or report any issues you've experienced.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feedback Category</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-3"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="general" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              General
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="technical" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Technical
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="suggestion" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Suggestion
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="complaint" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Complaint
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Brief description of your feedback" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please provide details of your feedback, suggestions, or issues you encountered..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How would you rate your experience?</FormLabel>
                      <FormControl>
                        <div className="flex justify-center w-full">
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <FormItem key={rating} className="flex flex-col items-center space-y-1 space-x-0">
                                <FormControl>
                                  <RadioGroupItem value={rating.toString()} className="sr-only" />
                                </FormControl>
                                <FormLabel
                                  className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium ${
                                    field.value === rating.toString()
                                      ? "bg-forest-600 text-white"
                                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                  }`}
                                >
                                  {rating}
                                </FormLabel>
                                <span className="text-xs text-gray-500">
                                  {rating === 1
                                    ? "Poor"
                                    : rating === 2
                                    ? "Fair"
                                    : rating === 3
                                    ? "Good"
                                    : rating === 4
                                    ? "Very Good"
                                    : "Excellent"}
                                </span>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="mt-6">
                  <Button type="submit" className="bg-forest-600 hover:bg-forest-700">
                    Submit Feedback
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
// import React from "react";
// import axios from "axios";
// import { Card, CardContent } from "@/components/ui/card";
// import QuickFeedbackButton from "@/components/QuickFeedbackButton";
// import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";
// import FeedbackDialog from "@/components/FeedbackDialog";

// const Feedback = () => {
//   const sendFeedbackToBackend = async (feedbackData) => {
//     try {
//       const response = await axios.post("/api/feedback", feedbackData);
//       console.log("Feedback submitted successfully:", response.data);
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-serif font-bold text-forest-800 mb-2">Feedback</h1>
//         <p className="text-gray-600 mb-6">
//           We value your opinion and are committed to improving your experience
//         </p>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardContent className="pt-6">
//             <h2 className="text-xl font-semibold text-forest-700 mb-4">Quick Feedback</h2>
//             <p className="text-gray-600 mb-6">
//               Share your thoughts, suggestions, or report issues you've experienced with our platform. Your feedback helps us improve!
//             </p>
//             <QuickFeedbackButton onSubmit={sendFeedbackToBackend} />
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="pt-6">
//             <h2 className="text-xl font-semibold text-forest-700 mb-4">Previous Feedback</h2>
//             <p className="text-gray-600 mb-6">
//               View the status and responses to your previous feedback submissions.
//             </p>
//             <div className="p-6 bg-gray-50 rounded-md text-center">
//               <p className="text-gray-500">You haven't submitted any feedback yet.</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
      
//       <div className="mt-8">
//         <Card>
//           <CardContent className="pt-6">
//             <h2 className="text-xl font-semibold text-forest-700 mb-4">Other Ways to Reach Us</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="p-4 bg-gray-50 rounded-md">
//                 <h3 className="font-medium text-forest-800 mb-2">Email Support</h3>
//                 <p className="text-sm text-gray-600">
//                   Send us an email at <a href="mailto:support@bovbridge.com" className="text-forest-600 hover:underline">support@bovbridge.com</a>
//                 </p>
//               </div>
              
//               <div className="p-4 bg-gray-50 rounded-md">
//                 <h3 className="font-medium text-forest-800 mb-2">Phone Support</h3>
//                 <p className="text-sm text-gray-600">
//                   Call us at <a href="tel:+918001234567" className="text-forest-600 hover:underline">+91 800 123 4567</a>
//                 </p>
//               </div>
              
//               <div className="p-4 bg-gray-50 rounded-md">
//                 <h3 className="font-medium text-forest-800 mb-2">Community Forum</h3>
//                 <p className="text-sm text-gray-600">
//                   Join our <a href="#" className="text-forest-600 hover:underline">farmer community forum</a> to connect with other users
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
      
//       {/* Add the floating feedback button that will be visible on all screens */}
//       <FloatingFeedbackButton />
//       <FeedbackDialog open={true} onOpenChange={() => {}} onSubmit={sendFeedbackToBackend} />
//     </div>
//   );
// };

// export default Feedback;
