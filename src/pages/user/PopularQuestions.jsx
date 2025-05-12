import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PopularQuestions = () => {
  const questions = [
    {
      question: "🐄 Why are dairy cows thinner than other cows?",
      answer: "Dairy cows use their energy to make milk. So, they look thinner. It’s normal and healthy for them."
    },
    {
      question: "💧 How can I keep my cattle healthy?",
      answer: "Give them clean water, good food, and a clean place to stay. Also, vaccinate them on time and call a vet if needed."
    },
    {
      question: "📋 What is BQA and why is it important?",
      answer: "BQA means Beef Quality Assurance. It helps farmers take better care of their animals and produce healthy meat."
    },
    {
      question: "🤒 How can I tell if my cow is sick?",
      answer: "If the cow is not eating, has a runny nose, coughing, or is weak, it may be sick. Call the vet soon."
    },
    {
      question: "🍽 Why do cows stop eating sometimes?",
      answer: "Stress, heat, or illness can cause cows to stop eating. Make sure they are comfortable and healthy."
    },
    {
      question: "💉 What vaccines should I give to my cattle?",
      answer: "Vaccines for Blackleg, BVD, IBR, and Leptospirosis are important. Ask your vet what’s best for your area."
    },
    {
      question: "👣 How do I avoid hoof problems in cows?",
      answer: "Trim hooves regularly, keep walking areas dry and clean. Check their feet often for any pain or wounds."
    },
    {
      question: "🦟 How often should I deworm my cattle?",
      answer: "Usually 2 to 4 times in a year. But it depends on where you live. A vet can guide you best."
    },
    {
      question: "🐮 How can I increase fertility in dairy cows?",
      answer: "Give good food, keep them healthy, and watch their heat cycle. Also, keep breeding records properly."
    },
    {
      question: "🛑 What should I do if a cow stops giving milk?",
      answer: "Check her food and water, give rest, and see if she is sick. Sometimes it’s natural, sometimes needs vet care."
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Most Asked Questions</h1>
      <p className="text-lg mb-6 text-gray-700">
        Here are the top questions asked by farmers about cattle health and care 🐄🌿
      </p>
      
      <div className="space-y-6">
        {questions.map((item, index) => (
          <Card key={index} className="border-green-100">
            <CardHeader className="bg-green-50 rounded-t-lg">
              <CardTitle className="text-green-800 text-xl">{item.question}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <CardDescription className="text-gray-700 text-base">{item.answer}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularQuestions;