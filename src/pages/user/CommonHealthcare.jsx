
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "../../components/LanguageSwitcher";

const CommonHealthcare = () => {
  const { t } = useTranslation();
  
  const healthcarePractices = [
    {
      title: "Regular Health Check-ups",
      description: "Schedule regular veterinary visits for your cattle, at least once every 6 months. Professional examinations can catch health issues before they become serious problems.",
      icon: "🩺"
    },
    {
      title: "Vaccination Schedule",
      description: "Maintain a proper vaccination calendar based on your vet's recommendations. Common vaccines include those for blackleg, anthrax, and bovine respiratory diseases.",
      icon: "💉"
    },
    {
      title: "Parasite Control",
      description: "Implement regular deworming and external parasite control. Rotate deworming products to prevent resistance development.",
      icon: "🦠"
    },
    {
      title: "Nutrition Management",
      description: "Provide a balanced diet with adequate protein, energy, minerals, and vitamins. Ensure access to clean, fresh water at all times.",
      icon: "🌾"
    },
    {
      title: "Housing and Environment",
      description: "Maintain clean, dry bedding and adequate ventilation. Provide shade in hot weather and shelter during cold or wet conditions.",
      icon: "🏡"
    },
    {
      title: "Hoof Care",
      description: "Regular hoof trimming prevents lameness issues. Check hooves frequently for signs of problems like cracks or infections.",
      icon: "👣"
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Common Healthcare Practices</h1>
      <p className="text-lg mb-6 text-gray-700">
        Basic healthcare practices that every farmer should implement to maintain cattle health and prevent common diseases.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {healthcarePractices.map((practice, index) => (
          <Card key={index} className="border-green-100 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 bg-green-50">
              <div className="text-4xl">{practice.icon}</div>
              <CardTitle className="text-green-800">{practice.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700">{practice.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommonHealthcare;
