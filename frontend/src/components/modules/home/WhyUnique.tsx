import { Clock, Star, User } from "lucide-react";

export default function WhyUnique() {
  const whyUniqueFeatures = [
    {
      id: 1,
      title: "Verified Expert Tutors",
      description:
        "All our tutors are verified professionals with proven teaching experience and expertise in their subjects.",
      icon: User,
    },
    {
      id: 2,
      title: "High-Quality Learning Experience",
      description:
        "Interactive sessions, personalized learning plans, and real-time feedback ensure effective learning for every student.",
      icon: Star,
    },
    {
      id: 3,
      title: "Flexible Scheduling & Booking",
      description:
        "Students can book sessions anytime with available tutors, and get instant updates on schedule changes.",
      icon: Clock,
    },
  ];
  return (
    <div>
      <div className="text-center py-20">
        <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-4">
          Everything you need to succeed
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We have built the tools and community to make learning effective,
          engaging, and enjoyable.
        </p>
      </div>

      <div className="relative flex flex-col lg:flex-row items-center max-w-7xl mx-auto px-4  gap-12">
        <div className="lg:w-1/2 w-full h-96 overflow-hidden rounded-3xl relative">
          <img
            src="/blogs/one.png"
            alt="Tutoring"
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Right Side - Features */}
        <div className="lg:w-1/2 w-full grid gap-8 ">
          {whyUniqueFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="flex items-start gap-4 dark:bg-gray-800 bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <Icon className="w-10 h-10 text-custom-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
