
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const Precautions = () => {
  const precautionCategories = [
    {
      title: "Biosecurity Measures",
      items: [
        "Isolate new animals for at least 30 days before introducing them to your herd",
        "Limit visitors to your farm, especially those who have been to other livestock operations",
        "Use footbaths containing disinfectant at entrances to animal areas",
        "Clean and disinfect vehicles that transport animals",
        "Maintain fences to prevent contact with neighboring herds"
      ]
    },
    {
      title: "Nutrition and Feeding",
      items: [
        "Ensure feed storage areas are clean, dry, and free from mold and pests",
        "Introduce new feed gradually to avoid digestive upsets",
        "Provide access to clean, fresh water at all times",
        "Maintain proper mineral supplementation appropriate for your region",
        "Test forages regularly for nutritional value and potential toxins"
      ]
    },
    {
      title: "Housing and Environment",
      items: [
        "Provide adequate ventilation in barns and shelters",
        "Maintain clean, dry bedding to prevent mastitis and hoof problems",
        "Ensure sufficient space per animal to reduce stress",
        "Protect animals from extreme weather conditions",
        "Implement a regular manure management system"
      ]
    },
    {
      title: "Vaccination Program",
      items: [
        "Work with your veterinarian to develop a vaccination schedule specific to your herd",
        "Store vaccines properly according to manufacturer instructions",
        "Use proper injection techniques and clean equipment",
        "Keep detailed records of all vaccines administered",
        "Follow age-specific vaccination protocols for calves"
      ]
    },
    {
      title: "Parasite Control",
      items: [
        "Implement strategic deworming based on seasonal risks",
        "Rotate pastures to break parasite life cycles",
        "Monitor for external parasites like flies, lice, and ticks",
        "Use different classes of dewormers to prevent resistance",
        "Conduct periodic fecal egg counts to assess parasite loads"
      ]
    },
    {
      title: "Calving Management",
      items: [
        "Maintain clean calving areas",
        "Monitor pregnant cows closely as they approach their due dates",
        "Ensure calves receive adequate colostrum within the first 6 hours of life",
        "Dip navels in iodine solution to prevent infections",
        "Keep detailed records of calving difficulties for future breeding decisions"
      ]
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Preventive Measures & Precautions</h1>
      <p className="text-lg mb-6 text-gray-700">
        Prevention is always better than cure. Follow these guidelines to keep your cattle healthy and reduce disease risks.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {precautionCategories.map((category, index) => (
          <Card key={index} className="border-green-100">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-xl text-green-800">{category.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Precautions;
