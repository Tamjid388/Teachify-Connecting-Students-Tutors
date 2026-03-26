"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function WeMadeEasy() {
  const howItWorksSteps = [
    {
      id: 1,
      step: "STEP 01",
      title: "Browse Tutor Profiles",
      description:
        "Students can explore verified tutor profiles, check their expertise, ratings, and teaching experience.",
      image: "/images/ill1.png",
    },
    {
      id: 2,
      step: "STEP 02",
      title: "Check Availability & Book",
      description:
        "View tutors’ available schedules and book sessions instantly that fit your preferred time slots.",
      image: "/images/ill2.png",
    },
    {
      id: 3,
      step: "STEP 03",
      title: "Learn & Track Progress",
      description:
        "Attend your booked sessions, get real-time updates, and track your learning progress efficiently.",
      image: "/images/ill3.png",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 ">
      {/* Header */}
      <div className="text-center py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Making Learning Easy for Everyone
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore tutors, check availability, book sessions, and learn effectively.
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-8">
        {howItWorksSteps.map((step) => (
          <Card
            key={step.id}
            className="flex flex-col items-center text-center hover:shadow-lg transition bg-white dark:bg-gray-800"
          >
            <CardContent className="flex flex-col items-center gap-4">
              <div className="w-32 h-32">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-custom-accent font-bold">{step.step}</div>
              <h3 className="text-xl font-semibold dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}